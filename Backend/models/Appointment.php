<?php
require_once '../config/database.php';

class Appointment {
    public static function getAll() {
        global $pdo;
        $stmt = $pdo->query("
            SELECT 
                appointments.appointment_id, 
                appointments.date,
                appointments.time,
                appointments.reason, 
                appointments.status,
                users.name AS patient_name
            FROM appointments
            JOIN users ON appointments.user_id = users.user_id
            WHERE appointments.status = 'Pending'
        ");
        return $stmt->fetchAll();
    }
    public static function getByUserId($user_id) {
        global $pdo;
        $stmt = $pdo->prepare("
            SELECT 
                appointments.appointment_id, 
                appointments.date, 
                appointments.time,
                appointments.reason, 
                users.name AS patient_name
            FROM appointments
            JOIN users ON appointments.user_id = users.user_id
            WHERE appointments.user_id = :user_id
        ");
        $stmt->execute(['user_id' => $user_id]);
        return $stmt->fetchAll();
    }
    public static function create($data) {
        global $pdo;
        $stmt = $pdo->prepare("
            INSERT INTO appointments (user_id, date, time, reason, created_at) 
            VALUES (:user_id, :date, :time, :reason, :created_at)
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
