<?php
require_once '../../config/database.php';

class User {
    public static function findByEmail($email) {
        global $pdo;

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }
}
