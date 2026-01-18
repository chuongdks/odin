
# STEP 1: Install packages (uncomment if needed)
# !pip install transformers gradio torch accelerate gTTS -q
# STEP 2: Import libraries

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import gradio as gr
import torch
from gtts import gTTS
import os

# STEP 3: Load a SMARTER conversational AI model
print("Loading your AI assistant... (this might take a minute)")
model_name = "google/flan-t5-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

print("Assistant loaded! Ready to chat.")

# STEP 4: Create the chat function with better prompting
def chat_with_assistant(user_input, history):
    context = "You are BOB, an intelligent and helpful AI assistant. Be conversational and friendly."
    
    if history:
        for human, assistant in history[-3:]:
            context += f"Human: {human}\nBOB: {assistant}\n"
            
    context += f"Human: {user_input}\nBOB:"
    inputs = tokenizer(context, return_tensors="pt", truncation=True, max_length=1024)
    outputs = model.generate(
    **inputs,
    max_length=256,
    num_beams=4,
    temperature=0.7,
    do_sample=True,
    top_p=0.9
    )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

# STEP 5: Create Gradio interface with voice
def gradio_chat_with_voice(message, history):
    response = chat_with_assistant(message, history)
    try:
        tts = gTTS(text=response, lang="en", slow=False)
        audio_file = "response.mp3"
        tts.save(audio_file)
        return response, audio_file
    except Exception as e:
        print(f"TTS Error: {e}")
        return response, None

# STEP 6: Create beautiful Gradio interface
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # Your Personal JARVIS Assistant
    ### Built in Google Colab with AI superpowers!
    Ask me anything - I'll respond with text and voice.
    """)
    
    with gr.Row():
        with gr.Column(scale=2):
            chatbot = gr.Chatbot(height=500, bubble_full_width=False)
            
            with gr.Row():
                msg = gr.Textbox(
                label="Your message",
                placeholder="Ask me anything...",
                scale=4
                )
                submit = gr.Button("Send", scale=1, variant="primary")
            
            clear = gr.Button("Clear Chat")
        
        with gr.Column(scale=1):
            audio_output = gr.Audio(label="n Voice Response", autoplay=True)
            gr.Markdown("### Quick Examples:")
            example_btns = [
            gr.Button("1. Introduce yourself"),
            gr.Button("2. Tell me a joke"),
            gr.Button("3. Explain AI simply"),
            gr.Button("4. Give me a fun fact"),
            ]
        
    def respond(message, chat_history):
        if not message.strip():
            return "", chat_history, None
            
        bot_response, audio_file = gradio_chat_with_voice(message, chat_history)
        chat_history.append((message, bot_response))
        return "", chat_history, audio_file
        
    msg.submit(respond, [msg, chatbot], [msg, chatbot, audio_output])
    submit.click(respond, [msg, chatbot], [msg, chatbot, audio_output])
    clear.click(lambda: [], None, chatbot, queue=False)
    
print("n Launching your AI assistant...")
demo.launch(share=True, debug=True)