// src/cron/testGmail.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testGmail() {
  // create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  // send a test message
  try {
    const info = await transporter.sendMail({
      from: `"HealthApp Test" <${process.env.GMAIL_USER}>`,
      to:   'aflam745@gmail.com', // my email address
      subject: 'Gmail SMTP Test',
      text:    'Gmail SMTP working!!!',
    });
    console.log('Test email sent, MessageId:', info.messageId);
  } catch (err: any) {
    console.error('Test email failed:', err.message || err);
  }
}

testGmail();
