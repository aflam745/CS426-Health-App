import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT!,
});

const worker = new Worker(
  'notificationQueue',
  async job => {
    const { email, name, nextRefill } = job.data as {
      email: string;
      name:  string;
      nextRefill: string;
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from:    `"HealthApp" <${process.env.GMAIL_USER}>`,
      to:       email,
      subject: 'Prescription Refill Reminder',
      text:    `Hi! Your prescription "${name}" is due for refill on ${nextRefill}.`,
    });

    console.log(`Sent reminder to ${email}`);
  },
  { connection }
);

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

console.log('Notification worker started');
