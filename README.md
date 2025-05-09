# Doctor Appointments Management System

This project is a web-based application for managing doctor appointments. It includes a frontend built with React and a backend powered by PHP. The system allows patients to book appointments, doctors to manage their schedules, and administrators to oversee the entire process.

## Features

### Frontend

- **Patient Panel**: View and manage appointments.
- **Doctor Panel**: Manage patients and appointments and mark them as done.
- **Authentication**: Login and registration for users.
- **Responsive Design**: Optimized for various devices.

### Backend

- **Database Integration**: Uses MySQL for data storage.
- **RESTful API**: Endpoints for managing appointments, availability, and user authentication.
- **Email Notifications**: Sends reminders for upcoming appointments.
- **Environment Variables**: Securely manages sensitive data like database credentials.

## Technologies Used

### Frontend

- React
- Vite
- React Router
- React Hot Toast

### Backend

- PHP
- MySQL
- PHPMailer
- Composer

## Installation

### Prerequisites

- Node.js and npm
- PHP and Composer
- MySQL database

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd doctor-appointments
   ```

2. **Setup Frontend**:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**:

   1. **Setup Environment Variables**:

      - Configure the required environment variables for database connection and other sensitive data.

   2. **Install Dependencies**:

      - Use Composer to install PHP dependencies:
        ```bash
        composer install
        ```

   3. **Start the Backend Server**:
      - Run the PHP server:
        ```bash
        php -S localhost:8000 -t Backend
        ```

4. **Database Setup**:
   - Import the database schema into MySQL.
   - Use the `railway` database credentials or any other provider.

## Project Structure

### Frontend

- `src/components`: Reusable React components.
- `src/pages`: Page-level components for routing.
- `src/utilities`: Utility functions like authentication checks.

### Backend

- `config`: Configuration files for database and email.
- `controllers`: Handles business logic.
- `models`: Database interaction logic.
- `routes`: API endpoints.

## Usage

1. **Patients**:

   - Register and log in.
   - Book, view, and manage appointments.

2. **Doctors**:

   - Log in to manage availability.
   - Mark appointments as done.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.



## Acknowledgments

- [Render](https://render.com) for hosting the backend.
- [Railway](https://railway.app) for database hosting.
- [React](https://reactjs.org) for the frontend framework.
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) for email notifications.
