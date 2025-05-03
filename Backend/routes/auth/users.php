<?php
require_once '../../controllers/auth/UserController.php';

// Allow requests from the frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['role']) && $_GET['role'] === 'patient') {
    $result = UserController::getAllPatients();
    echo json_encode($result);
}