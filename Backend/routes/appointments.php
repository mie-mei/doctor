<?php
    require_once '../controllers/AppointmentController.php';
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = AppointmentController::getAppointmentById($id);
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
    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
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