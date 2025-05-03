<?php
require_once '../config/database.php';

class Availability {
    public static function getAllAvailabilities() {
        global $pdo;
        $stmt = $pdo->query("
            SELECT week_day, start_time, end_time
            FROM availability
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function getAvailableSlots($week_day) {
        global $pdo;

        // Fetch static availability for the given day
        $stmt = $pdo->prepare("
            SELECT start_time, end_time
            FROM availability
            WHERE week_day = :week_day
        ");
        $stmt->execute(['week_day' => $week_day]);
        $availability = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$availability) {
            return ['date' => null, 'slots' => []]; // No availability for the given day
        }

        // Calculate the date for the next occurrence of the given week day
        $next_date = date('Y-m-d', strtotime("next $week_day"));

        // Fetch all taken slots for the given date
        $stmt = $pdo->prepare("
            SELECT time
            FROM appointments
            WHERE date = :date
        ");
        $stmt->execute(['date' => $next_date]);
        $taken_slots = $stmt->fetchAll(PDO::FETCH_COLUMN);

        // Generate all 30-minute slots between start_time and end_time
        $available_slots = [];
        $start_time = strtotime($availability['start_time']);
        $end_time = strtotime($availability['end_time']);
        while ($start_time < $end_time) {
            $time = date('H:i:s', $start_time);
            if (!in_array($time, $taken_slots)) {
                $available_slots[] = $time;
            }
            $start_time = strtotime('+30 minutes', $start_time);
        }

        // Return the next date and available slots
        return [
            'date' => $next_date,
            'slots' => $available_slots
        ];
    }
}