# MediTracker

MediTracker is a full-stack web application that helps users track their medications, receive timely SMS reminders, and manage their medicine schedules with ease. The app features a modern React frontend, an Express.js backend, and MongoDB for data storage. SMS notifications are powered by Twilio.

---

## Features

- **User Authentication:** Register and log in securely.
- **Medicine Management:** Add, view, and delete medicines with dosage and schedule details.
- **SMS Reminders:** Receive SMS notifications for scheduled medicines (Twilio integration).
- **Responsive UI:** Modern, mobile-friendly interface with Material-UI theming and custom illustrations.
- **User Profile:** Manage your account and phone number for notifications.

---

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Notifications:** Twilio SMS API

---

## Folder Structure

```
medicine-tracker-frontend/   # React app (client)
medicine-tracker-backend/    # Express API server (backend)
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)
- Twilio account (for SMS notifications)

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd <repo-root>
```

### 2. Backend Setup

```
cd medicine-tracker-backend
npm install
```

#### Create a `.env` file in `medicine-tracker-backend/` with the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

#### Start the Backend

```sh
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000) by default.

### 3. Frontend Setup

```
cd medicine-tracker-frontend
npm install
```

#### Start the Frontend (Development)

```sh
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

#### Build for Production

```sh
npm run build
```

To serve the React build from the backend, copy the `build/` folder to `medicine-tracker-backend/public/`.

---

## Deployment

- **Local:** Serve the React build from Express by copying the frontend `build/` to `backend/public/`.
- **Cloud:**
  - **Frontend:** Deploy to Netlify or Vercel.
  - **Backend:** Deploy to Render, Heroku, or similar. Set environment variables in your cloud provider.

---

## Environment Variables

| Variable                | Description                       |
|-------------------------|-----------------------------------|
| MONGODB_URI             | MongoDB connection string          |
| JWT_SECRET              | Secret for JWT auth                |
| TWILIO_ACCOUNT_SID      | Twilio account SID                 |
| TWILIO_AUTH_TOKEN       | Twilio auth token                  |
| TWILIO_PHONE_NUMBER     | Twilio phone number (E.164 format) |

---

## Notes & Limitations

- **Twilio Trial:** SMS can only be sent to verified numbers on a Twilio trial account.
- **Security:** Do not commit your `.env` file or credentials to version control.
- **Improvements:**
  - Add medicine editing.
  - Support for multiple users per account (e.g., family).
  - Push notifications or email reminders.

---

## License

This project is for educational purposes. See [LICENSE](LICENSE) for details.

---

## Credits

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI](https://mui.com/)
- [Twilio](https://www.twilio.com/)

---

## Contact

For questions or support, please contact the project maintainer.

