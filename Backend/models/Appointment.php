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
    public static function getById($id) {
        global $pdo;
        $stmt = $pdo->prepare("
            SELECT 
                appointments.appointment_id, 
                appointments.date, 
                appointments.reason, 
                users.name AS patient_name
            FROM appointments
            JOIN users ON appointments.user_id = users.user_id
            WHERE appointments.appointment_id = :id
        ");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }
    public static function create($data) {
        global $pdo;
        $stmt = $pdo->prepare("
            INSERT INTO appointments (user_id, date, reason) 
            VALUES (:user_id, :date, :reason)
        ");
        return $stmt->execute($data);
    }
    public static function delete($id) {
        global $pdo;
        $stmt = $pdo->prepare("
            DELETE FROM appointments 
            WHERE appointment_id = :id
        ");
        return $stmt->execute(['id' => $id]);
    }
}
