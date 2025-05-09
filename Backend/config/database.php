<?php

$host = 'shinkansen.proxy.rlwy.net';
$port = 34428;
$dbname = 'railway';
$user = 'root';
$pass = 'lfkxibSXNCtnKTpzmoIhXfgwGWXLKkNs';


try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $pass);
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Fetch mode
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
