<?php
require_once '../models/Appointment.php';

class AppointmentController {
    public static function getAllAppointments() {
        return Appointment::getAll();
    }
    public static function createAppointment($data) {
        return Appointment::create($data);
    }
    public static function deleteAppointment($id) {
        return Appointment::delete($id);
    }
    public static function getAppointmentsByUserId($user_id) {
        return Appointment::getByUserId($user_id);
    }
    public static function updateAppointment($appointment_id, $data) {
        return Appointment::update($appointment_id, $data);
    }
    public static function getAppointmentById($id) {
        return Appointment::getById($id);
    }
}
