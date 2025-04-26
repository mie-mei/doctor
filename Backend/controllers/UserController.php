<?php
require_once '../models/User.php';

class UserController {
    public static function getAllUsers() {
        return User::getAll();
    }
}
