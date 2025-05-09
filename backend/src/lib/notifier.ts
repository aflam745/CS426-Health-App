import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis({ host: process.env.REDIS_HOST, port: +process.env.REDIS_PORT! });
export const notificationQueue = new Queue('notificationQueue', { connection });

/**
 * Schedule a series of "refillReminder" jobs at 8 AM local time
 * for each day from `daysBefore` days before `nextRefill` up to the refill date.
 */
export async function scheduleRefillReminder(
  email: string,
  name: string,
  nextRefill: string,
  daysBefore: number = 5
) {
  const jobs: Promise<any>[] = [];
  const refillDate = new Date(nextRefill);

  // current day at midnight:
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = daysBefore; offset >= 0; offset--) {
    const runAt = new Date(refillDate);
    runAt.setDate(runAt.getDate() - offset);
    runAt.setHours(8, 0, 0, 0);

    // skip anything strictly before current day
    if (runAt < today) continue;

    const delay = runAt.getTime() - Date.now();
    jobs.push(
      notificationQueue.add(
        'refillReminder',
        { email, name, nextRefill, offset },
        { delay: Math.max(0, delay), attempts: 3 }
      )
    );
  }

  //return when all jobs are finished
  return Promise.all(jobs);
}
