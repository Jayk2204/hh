<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $enrollment = $_POST['enrollment'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT password FROM users_detailes WHERE enrollment = ?");
    $stmt->bind_param("s", $enrollment);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            echo json_encode(["status" => "success", "message" => "Login successful!"]);
            exit();
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid Enrollment number or Password."]);
            exit();
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid Enrollment number or Password."]);
        exit();
    }

    $stmt->close();
}

$conn->close();
?>
