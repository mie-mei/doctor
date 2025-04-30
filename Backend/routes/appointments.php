<?php
    // Allow requests from the frontend
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Content-Type: application/json');

    require_once '../controllers/AppointmentController.php';

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['user_id'])) {
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
            'reason' => $input['reason'],
            'created_at' => date('Y-m-d H:i:s'),
        ];
        $result = AppointmentController::createAppointment($data);
        echo json_encode($result);
    }
?>