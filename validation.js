document.getElementById('createAccountForm').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const enrollment = document.getElementById('enrollment').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const namePattern = /^[A-Za-z ]+$/;
    const mobilePattern = /^[0-9]{10}$/;
    const enrollmentPattern = /^[0-9]{2}[A-Z]{2}[0-9]{7}$/;

    if (!namePattern.test(name)) {
        alert('Name must contain only alphabets.');
        e.preventDefault();
    } else if (!mobilePattern.test(mobile)) {
        alert('Mobile number must be 10 digits.');
        e.preventDefault();
    } else if (!enrollmentPattern.test(enrollment)) {
        alert('Enrollment number format is invalid.');
        e.preventDefault();
    } else if (password !== confirmPassword) {
        alert('Passwords do not match.');
        e.preventDefault();
    } else {
        alert('Account created successfully! Redirecting to Login page.');
        window.location.href = 'index.html';
    }
});
