<?php
session_start();
require_once '../../controllers/auth/RegisterController.php';

// Allow requests from the frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the user data
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $role = 'patient';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $result = RegisterController::register($name, $email, $hashedPassword, $role);
    echo json_encode($result);
}
