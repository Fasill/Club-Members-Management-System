# Full Stack Club Management System

Welcome to the Full Stack Club Management System! This system is built using React for the frontend, Node.js and Express for the backend, and Firestore as the database. The backend is deployed on Render.com, and you can easily set up the frontend on your local machine. Follow the instructions below to get started.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/full-stack-club-management-system.git
   cd full-stack-club-management-system
   ```

2. **Install Dependencies:**
   If you prefer using Docker:
   ```bash
   docker-compose up
   ```
   Or, if you prefer using npm:
   ```bash
   npm install
   ```

3. **Run the Application:**
   If you are using Docker, the application will be running in a container. If you are using npm:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Explore the Home Page:**
   Open your browser and go to `http://localhost:3000` to access the home page.

## User Authentication

- Click on the "Login" button to log in.
- If you forget your password, click on "Login by Email" to receive a verification link.
- Check your email, click the verification link, and update your password.

## Admin Access

- **President:**
  - Email: president@p.com
  - Password: 12345678
  - As the president, you have additional privileges, including changing your profile information.

- **Admins:**
  - Admins can log in using their credentials.
  - Admins can add members and events to the system.

## Features

- **Profile Management:**
  - Users can update their profile information.

- **Admin Privileges:**
  - President and admins can manage members and events.

- **Event Viewing:**
  - Members can view upcoming events.

Feel free to explore and customize the system according to your needs. If you have any questions or issues, please refer to the documentation or contact the development team.

Happy managing! 🚀
