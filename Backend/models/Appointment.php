<?php
require_once '../config/database.php';

class Appointment {
    public static function getAll() {
        global $pdo;
        $stmt = $pdo->query("
            SELECT 
                appointments.appointment_id, 
                appointments.date, 
                appointments.reason, 
                users.name AS patient_name
            FROM appointments
            JOIN users ON appointments.user_id = users.user_id
        ");
        return $stmt->fetchAll();
    }
}
