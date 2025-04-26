<?php
require_once '../models/Appointment.php';

class AppointmentController {
    public static function getAllAppointments() {
        return Appointment::getAll();
    }
}
