<?php
    require_once '../controllers/UserController.php';

    header('Content-Type: application/json');
    $users = UserController::getAllUsers();
    echo json_encode($users);
?>