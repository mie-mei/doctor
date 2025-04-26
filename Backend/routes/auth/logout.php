<?php
session_start();

// Clear all session variables (cookies)
session_unset();

// Destroy the session
session_destroy();

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

echo json_encode(["message" => "Logged out successfully"]);
?>