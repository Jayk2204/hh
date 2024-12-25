const form = document.getElementById('loginForm');
const inputs = form.querySelectorAll('input');

// Validation pattern
const enrollmentPattern = /^[0-9]{2}[A-Z]{2}[0-9]{7}$/;

form.addEventListener('submit', (e) => {
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

   /* if (!isValid) {
        e.preventDefault();
        alert('Please fix the errors in the form.');
    } else {
        alert('Login successful! Redirecting to the main website.');
       // window.location.href = 'https://helping-hands-by-jaykishan.netlify.app/';
    }*/
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    let form = event.target;
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', form.action, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                alert(response.message);
                setTimeout(function() {
                    window.location.href = 'https://helping-hands-by-jaykishan.netlify.app/';
                }, 100); // Small delay to ensure alert is processed
            } else {
                alert(response.message);
            }
        } else {
            alert('An error occurred: ' + xhr.statusText);
        }
    };

    xhr.send(formData);
});


inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    let isValid = false;

    if (input.id === 'enrollment') {
        isValid = enrollmentPattern.test(input.value);
    } else if (input.id === 'password') {
        isValid = input.value.length >= 8;;
    }

    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }

    return isValid;
}
