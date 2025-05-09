<?php
require_once '../models/Availability.php';

class AvailabilityController {
    public static function getAvailableSlots($week_day) {
        return Availability::getAvailableSlots($week_day);
    }
    public static function getAllAvailabilities() {
        return Availability::getAllAvailabilities();
    }
}