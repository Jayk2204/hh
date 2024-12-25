<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$mobile = $_POST['mobile'];
$enrollment = $_POST['enrollment'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

// Validate form data
if ($password !== $confirmPassword) {
    die("Passwords do not match.");
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert data into database
$sql = "INSERT INTO users_detailes (name, mobile, enrollment, password) VALUES ('$name', '$mobile', '$enrollment', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
