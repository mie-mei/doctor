<?php
session_start();

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "authenticated" => true,
        "role" => $_SESSION['role']
    ]);
} else {
    echo json_encode([
        "authenticated" => false
    ]);
}
