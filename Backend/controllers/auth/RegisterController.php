<?php
require_once '../../models/auth/User.php';

class RegisterController {
    public static function register($name, $email, $password, $role) {
        // Check if the email already exists
        $existingUser = User::findByEmail($email);
        if ($existingUser) {
            return ["error" => "Email already exists"];
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insert the new user into the database
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$name, $email, $hashedPassword, $role])) {
            $_SESSION['user_id'] = $pdo->lastInsertId();
            $_SESSION['role'] = $role;
            $_SESSION['name'] = $name;
            return [
                "message" => "Registration successful",
                "user_id" => $_SESSION['user_id'],
                "name" => $_SESSION['name'],
                "role" => $_SESSION['role']
            ];
        } else {
            return ["error" => "Registration failed"];
        }
    }
}