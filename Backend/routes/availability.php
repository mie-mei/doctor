<?php
require_once '../controllers/AvailabilityController.php';

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $week_day = $_GET['week_day'] ?? null;
    if ($week_day) {
        $result = AvailabilityController::getAvailableSlots($week_day);
        echo json_encode($result);
    } else {
        $result = AvailabilityController::getAllAvailabilities($week_day);
        echo json_encode($result);
    }
}