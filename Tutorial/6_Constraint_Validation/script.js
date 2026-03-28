const form = document.getElementById('registration-form');
const email = document.getElementById('email');
const pwd = document.getElementById('pwd');
const pwdConfirm = document.getElementById('pwd-confirm');

// 1. Centralized Validation Function
function validateField(input) {
  const errorSpan = input.nextElementSibling;
  
  // Custom logic for Password Confirmation
  if (input.id === 'pwd-confirm') {
    if (pwdConfirm.value !== pwd.value) {
      pwdConfirm.setCustomValidity("Passwords do not match.");
    } else {
      pwdConfirm.setCustomValidity("");
    }
  }

  if (input.validity.valid) {
    errorSpan.textContent = ""; // Clear message
  } else {
    showError(input, errorSpan);
  }
}

// 2. Error Message Selector
function showError(input, span) {
  const state = input.validity;

  if (state.valueMissing) {
    span.textContent = "This field is required.";
  } else if (state.typeMismatch) {
    span.textContent = `Please enter a valid ${input.type}.`;
  } else if (state.tooShort) {
    span.textContent = `Too short! Must be at least ${input.minLength} characters.`;
  } else if (state.patternMismatch) {
    span.textContent = "Format is incorrect (e.g., 5-digit zip).";
  } else if (state.customError) {
    span.textContent = input.validationMessage;
  }
}

// 3. Event Listeners
form.querySelectorAll('input').forEach(input => {
  // Validate as they type
  input.addEventListener('input', () => {
    validateField(input);
  });

  // Add "touched" class when they leave the field
  input.addEventListener('blur', () => {
    input.classList.add('touched');
    validateField(input);
  });
});

// 4. Submission Handling
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    // Force all fields to show errors
    form.querySelectorAll('input').forEach(input => {
      input.classList.add('touched');
      validateField(input);
    });
    alert("Please correct the errors before submitting.");
  } else {
    alert("High Five. Form is valid.");
  }
});