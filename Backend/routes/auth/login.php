<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'doctor-appointments-5pb4.onrender.com',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();
require_once '../../controllers/auth/LoginController.php';

// Allow requests from the frontend
header("Access-Control-Allow-Origin: https://appointments-doctor.vercel.app");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight CORS checks
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: https://appointments-doctor.vercel.app");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    exit(0); 
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and password are required"]);
        exit;
    }

    $result = LoginController::login($email, $password);
    echo json_encode($result);
}
