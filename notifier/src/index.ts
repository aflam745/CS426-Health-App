// Load environment variables from .env
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure Redis connection for BullMQ
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT!,
});

// Instantiate a BullMQ Worker to process jobs from the 'notificationQueue'
const worker = new Worker(
  'notificationQueue', // Queue name
  async job => { // Job processing function
    // Extract job data
    const { email, name, nextRefill } = job.data as {
      email: string;
      name: string;
      nextRefill: string;
    };

    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send the reminder email
    await transporter.sendMail({
      from: `"Health2.0" <${process.env.GMAIL_USER}>`, // Sender info
      to: email, // Recipient
      subject: 'Prescription Refill Reminder',  // Email subject
      text: `Hi! Your prescription "${name}" is due for refill on ${nextRefill}.`, // Body text
    });

    // Log success
    console.log(`Sent reminder to ${email}`);
  },
  { connection } // Use the Redis connection
);

// Listen for and log failed jobs
worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

// Indicate worker startup
console.log('Notification worker started');
