<?php
require_once '../config/database.php';

class User {
    public static function getAll() {
        global $pdo;
        $stmt = $pdo->query("SELECT user_id, name, email, role FROM users");
        return $stmt->fetchAll();
    }
}
