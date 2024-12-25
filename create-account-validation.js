const form = document.getElementById('createAccountForm');
const inputs = form.querySelectorAll('input');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Real-time validation for all inputs
inputs.forEach((input) => {
    input.addEventListener('input', () => validateInput(input));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const nextInput = input.nextElementSibling.nextElementSibling; // Move to next input
            if (nextInput && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            }
        }
    });
});

document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    let form = event.target;
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', form.action, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = xhr.responseText;
            if (response.includes('New record created successfully')) {
                alert('Account created successfully!');
                window.location.href = 'index.html';
            } else {
                alert('An error occurred: ' + response);
            }
        } else {
            alert('An error occurred: ' + xhr.statusText);
        }
    };
    xhr.send(formData);
});


function validateInput(input) {
    let isValid = false;

    if (input.id === 'name') {
        isValid = /^[A-Za-z ]+$/.test(input.value);
    } else if (input.id === 'mobile') {
        isValid = /^[0-9]{10}$/.test(input.value);
    } else if (input.id === 'enrollment') {
        isValid = /^[0-9]{2}[A-Z]{2}[0-9]{7}$/.test(input.value);
    } else if (input.id === 'password') {
        isValid = input.value.length >= 8;
    } else if (input.id === 'confirmPassword') {
        isValid = input.value === passwordInput.value && passwordInput.value.length >= 8;
    }

    input.classList.toggle('invalid', !isValid);
    input.classList.toggle('valid', isValid);

    return isValid; // Ensure this function returns whether the input is valid or not
}

// Form Submission Validation
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    let allValid = true;
    inputs.forEach((input) => {
        if (!validateInput(input)) {
            allValid = false;
        }
    });

    /*if (allValid) {
        alert('Account created successfully!');
        window.location.href = 'index.html'; // Redirect to login page
    } else {
        alert('Please fix the errors in the form.');
    }*/
});
