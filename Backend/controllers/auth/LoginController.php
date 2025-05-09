<?php
require_once '../../models/auth/User.php';

class LoginController {
    public static function login($email, $password) {
        $user = User::findByEmail($email);
        
        if (!$user) {
            return ["error" => "Invalid credentials"];
        }

        // Verify the password
        if (!password_verify($password, $user['password'])) {
            return ["error" => "Invalid credentials"];
        }

        // Set session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['name'] = $user['name'];

        return [
            "message" => "Login successful",
            "role" => $user['role']
        ];
    }
}
