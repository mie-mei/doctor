<?php
    require_once '../controllers/AppointmentController.php';

    header('Content-Type: application/json');
    $appointments = AppointmentController::getAllAppointments();
    echo json_encode($appointments);
?>