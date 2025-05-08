// src/cron/emailReminderJob.ts
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { query } from '../db';

async function sendRefillEmails() {
  //Fetch prescriptions due in 5 days
  const reminders = await query<{
    user_id: number;
    email:   string;
    name:    string;
    next_refill_date: string;
  }>(`
    SELECT p.user_id, p.name, p.next_refill_date, u.email
      FROM prescriptions p
      JOIN users u ON u.id = p.user_id
     WHERE p.next_refill_date::date > CURRENT_DATE
      AND p.next_refill_date::date <= CURRENT_DATE + INTERVAL '5 days'
  `);

  if (!reminders.length) {
    console.log('[EmailReminderJob] no reminders today');
    return;
  }

  // Create a Gmail transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  // Send one email per reminder
  for (const r of reminders) {
    const mailOptions = {
      from:    `"HealthApp" <${process.env.GMAIL_USER}>`,
      to:       r.email,
      subject: 'Prescription Refill Reminder',
      text:    `Hi! Your prescription "${r.name}" is due for refill on ${r.next_refill_date}.`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `[EmailReminderJob] sent to ${r.email} (MessageId: ${info.messageId})`
      );
    } catch (err: any) {
      console.error(`[EmailReminderJob] failed to ${r.email}:`, err.message || err);
    }
  }
}

// Schedule the job to run every day at 8:00 AM
cron.schedule(
  '0 8 * * *',
  () => {
    console.log(
      '[EmailReminderJob] running at',
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
    sendRefillEmails().catch(e => console.error('[EmailReminderJob]', e));
  },
  {
    timezone: 'America/New_York'    // interpret the schedule in EST/EDT
  }
);

