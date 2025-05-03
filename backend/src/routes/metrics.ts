// src/routes/metrics.ts
import { Router } from 'express';
import { query } from '../db';

interface MetricType { id: number; user_id: number; name: string; created_at: string; }
interface MetricEntry { id: number; metric_type_id: number; entry_date: string; value: number; note?: string; created_at: string; }

const router = Router();

// Metric Types for a User
router.get('/types/:userId', async (req, res, next) => {
  try {
    const rows = await query<MetricType>(
      'SELECT * FROM metric_types WHERE user_id=$1',
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) { next(err) }
});

// New Metric Type
router.post('/types', async (req, res, next) => {
  const { user_id, name } = req.body as { user_id: number; name: string };
  try {
    const rows = await query<MetricType>(
      `INSERT INTO metric_types (user_id,name) VALUES ($1,$2) RETURNING *`,
      [user_id, name]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err) }
});

// Add Entry
router.post('/entries', async (req, res, next) => {
  const { metric_type_id, entry_date, value, note } = req.body as Partial<MetricEntry>;
  try {
    const rows = await query<MetricEntry>(
      `INSERT INTO metric_entries
         (metric_type_id,entry_date,value,note)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [metric_type_id, entry_date, value, note]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err) }
});

// List Entries
router.get('/entries/:metricTypeId', async (req, res, next) => {
  try {
    const rows = await query<MetricEntry>(
      `SELECT * FROM metric_entries
       WHERE metric_type_id=$1
       ORDER BY entry_date DESC`,
      [req.params.metricTypeId]
    );
    res.json(rows);
  } catch (err) { next(err) }
});

export default router;
