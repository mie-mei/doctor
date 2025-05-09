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

// Clear all session variables (cookies)
session_unset();

// Destroy the session
session_destroy();

header("Access-Control-Allow-Origin: https://appointments-doctor.vercel.app");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

echo json_encode(["message" => "Logged out successfully"]);
?>