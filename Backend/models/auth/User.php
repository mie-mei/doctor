<?php
require_once '../../config/database.php';

class User {
    public static function findByEmail($email) {
        global $pdo;

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    public static function getAllPatients() {
        global $pdo;
        $stmt = $pdo->query("
            SELECT user_id, name, email 
            FROM users 
            WHERE role = 'patient'
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
