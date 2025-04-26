<?php
require_once '../../models/auth/User.php';

class LoginController {
    public static function login($email, $password) {
        $user = User::findByEmail($email);
        // Check if the user exists and verify the password
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['role'] = $user['role'];

            return [
                "message" => "Login successful",
                "role" => $user['role']
            ];
        } else {
            return ["error" => "Invalid credentials"];
        }
    }
}
