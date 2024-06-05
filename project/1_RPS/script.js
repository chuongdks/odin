let humanScore = 0;
let computerScore = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Get COM choice by random number
function getComputerChoice() 
{
    switch (getRandomInt(3))
    {
        case 0:
            comChoice = "rock";
            break;
        case 1:
            comChoice = "paper";
            break;
        case 2:
            comChoice = "scissors";
            break;
    }
    console.log(`Computer choose: ${comChoice}`);
    return comChoice;
}

// Get player choice by player prompt
function getHumanChoice()
{
    let userInput = "";

    let rockBtn     = document.querySelector("#rock");
    let paperBtn    = document.querySelector("#paper");
    let scissorBtn  = document.querySelector("#scissors");

    rockBtn.addEventListener('click', (event) => {
        console.log('clicked Rock');
        userInput = "Rock";
    });

    paperBtn.addEventListener('click', (event) => {
        console.log('clicked Paper');
        userInput = "Paper";
    });

    scissorBtn.addEventListener('click', (event) => {
        console.log('clicked Scissors');
        userInput = "Scissors";
    });
    
    const validInputs = ["rock", "paper", "scissors"];

    // if (userInput.toLowerCase() === "rock" || userInput.toLowerCase() === "paper" || userInput.toLowerCase() === "scissors") // Long way
    if (validInputs.includes(userInput.toLowerCase())) 
    {
        console.log(`Player choose: ${userInput}`);
        return userInput.toLowerCase()
    }
    else
    {
        console.log("Wrong choice bozo. Default to Rock");
        return userInput = "rock";
    }
}

// Compare Player choices with COM choices
function playRound(humanChoice, computerChoice) 
{
    // Draw Condition
    if (humanChoice === computerChoice)
    {
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
        result = `It is a draw. Both chose ${humanChoice}`;
    }
    // Winning Condition
    else if ((humanChoice === "rock" && computerChoice === "scissors") || (humanChoice === "paper" && computerChoice === "rock") || (humanChoice === "scissors" && computerChoice === "paper"))
    {
        humanScore++;
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
        result = `You Won! ${humanChoice} beats ${computerChoice}`;
    }
    // Losing Condition
    else if ((humanChoice === "rock" && computerChoice === "paper") || (humanChoice === "paper" && computerChoice === "scissors") || (humanChoice === "scissors" && computerChoice === "rock"))
    {
        computerScore++;
        console.log(`Player: ${humanScore}  COM: ${computerScore}`);
        result = `You Lose! ${computerChoice} beats ${humanChoice}`;
    }
    return result;
}

function playGame() 
{
    // Get the human choice and then computer choice, COM can cheat in this part
    for (let i = 0; i < 5; i++)
    {
        humanSelection = getHumanChoice();
        computerSelection = getComputerChoice();    
        alert(playRound(humanSelection, computerSelection));
    }

    if (humanScore > computerScore)
    {
        console.debug("You Win");
        resultMatch = "You Win";
    }
    else if (humanScore < computerScore)
    {
        console.debug("You Lose");
        resultMatch = "You Lose";
    }
    else 
    {
        console.debug("TIE");
        resultMatch = "TIE";
    }
    return resultMatch;
}

alert(playGame());