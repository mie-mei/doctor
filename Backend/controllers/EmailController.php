<?php
require_once __DIR__ . '/../models/Appointment.php';
require_once __DIR__ . '/../../vendor/autoload.php';
$config = require __DIR__ . '/../config/email.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailController {
    private static function getMailer() {
        global $config;
        $mail = new PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['username'];
        $mail->Password = $config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        // Sender info
        $mail->setFrom($config['username'], $config['from_name']);
        $mail->addReplyTo($config['username'], $config['from_name']);
        
        return $mail;
    }

    public static function sendEmail($to, $subject, $message) {
        try {
            $mail = self::getMailer();
            
            // Recipient
            $mail->addAddress($to);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;
            
            return $mail->send();
        } catch (Exception $e) {
            error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            return false;
        }
    }

    public static function sendAppointmentReminders() {
        $appointments = Appointment::getUpcomingAppointments();
        
        foreach ($appointments as $appointment) {
            $subject = "Appointment Reminder - " . $appointment['date'];
            $message = "
                <html>
                <body>
                    <h2>Appointment Reminder</h2>
                    <p>Dear " . $appointment['patient_name'] . ",</p>
                    <p>This is a reminder that you have an appointment scheduled for:</p>
                    <p><strong>Date:</strong> " . $appointment['date'] . "</p>
                    <p><strong>Time:</strong> " . $appointment['time'] . "</p>
                    <p><strong>Reason:</strong> " . $appointment['reason'] . "</p>
                    <p>Please arrive 15 minutes before your scheduled time.</p>
                    <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
                    <p>Best regards,<br>Dr. Mohammed Clinic</p>
                </body>
                </html>
            ";
            
            self::sendEmail($appointment['patient_email'], $subject, $message);
            echo "Reminder sent to: " . $appointment['patient_email'] . " for appointment on " . $appointment['date'] . " at " . $appointment['time'] . "<br>";
        }
    }
} 