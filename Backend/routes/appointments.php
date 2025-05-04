<?php
    // Allow requests from the frontend
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
    header('Content-Type: application/json');

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    require_once '../controllers/AppointmentController.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = AppointmentController::getAppointmentById($id);
            echo json_encode($result);
        } elseif (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $result = AppointmentController::getAppointmentsByUserId($user_id);
            echo json_encode($result);
        } else {
            $result = AppointmentController::getAllAppointments();
            echo json_encode($result);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
// Delete an appointment
        $id = $_GET['id'] ?? null;
        if ($id) {
            $result = AppointmentController::deleteAppointment($id);
            echo json_encode($result);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            'user_id' => $input['user_id'],
            'date' => $input['date'],
            'time' => $input['time'],
            'reason' => $input['reason'],
            'created_at' => date('Y-m-d H:i:s'),
        ];
        $result = AppointmentController::createAppointment($data);
        echo json_encode($result);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $id = $_GET['id'] ?? null;
        $input = json_decode(file_get_contents('php://input'), true);
        $data = [
            'date' => $input['date'] ?? null,
            'time' => $input['time'] ?? null,
            'reason' => $input['reason'] ?? null,
            'status' => $input['status'] ?? null
        ];
        if ($id) {
            $result = AppointmentController::updateAppointment($id, $data);
            echo json_encode(['success' => $result]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing appointment_id']);
        }
    }
?>