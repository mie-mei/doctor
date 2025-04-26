<?php
require_once '../models/Appointment.php';

class AppointmentController {
    public static function getAllAppointments() {
        return Appointment::getAll();
    }
    public static function getAppointmentById($id) {
        return Appointment::getById($id);
    }
    public static function createAppointment($data) {
        return Appointment::create($data);
    }
    public static function deleteAppointment($id) {
        return Appointment::delete($id);
    }
}
