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
require_once '../../controllers/auth/RegisterController.php';

// Allow requests from the frontend
header("Access-Control-Allow-Origin: https://appointments-doctor.vercel.app");
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

    $result = RegisterController::register($name, $email, $password, $role);
    echo json_encode($result);
}
