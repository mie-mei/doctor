<?php
require_once '../../models/auth/User.php';

class UserController {
    public static function getAllPatients() {
        return User::getAllPatients();
    }
}