require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require('twilio');
const cron = require('node-cron');
const Medicine = require('./models/medicine');
const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const medicinesRouter = require('./routes/medicines');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// Schedule a job to run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // 'HH:MM'
  console.log('Cron running at:', currentTime);
  try {
    const medicines = await Medicine.find({ time: currentTime }).populate('user');
    console.log('Medicines found for this minute:', medicines.map(m => m.name));
    for (const med of medicines) {
      if (med.user && med.user.phone) {
        const toPhone = med.user.phone.startsWith('+') ? med.user.phone : `+${med.user.phone}`;
        console.log(`Sending SMS to ${toPhone} for medicine: ${med.name}`);
        await twilioClient.messages.create({
          body: `Reminder: Take your medicine '${med.name}' now!`,
          from: TWILIO_PHONE,
          to: toPhone
        });
      }
    }
  } catch (err) {
    console.error('Error sending SMS reminders:', err);
  }
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/medicines', medicinesRouter);

module.exports = app;
