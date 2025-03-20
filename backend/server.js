import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import startIMAP from './config/imap.js';
import emailRoutes from './routes/emailRoutes.js';
import fetchEmails from './config/imap.js';
import { getMockEmails } from './config/mockEmails.js';
import Email from './models/emailModel.js';
import cors from 'cors'

const printEmails = async () => {
  try {
    const emails = await Email.find();
    console.log("Fetched Emails from MongoDB:");
    console.log(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
};

printEmails();



dotenv.config();
// console.log(`IMAP Username: ${process.env.IMAP_USER}`);
// console.log(`IMAP Password: ${process.env.IMAP_PASS}`);
//console.log(`IMAP Port: ${process.env.IMAP_PORT}`);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
connectDB();
//startIMAP();
fetchEmails();
const emails = getMockEmails();
console.log(emails);
const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/emails', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
