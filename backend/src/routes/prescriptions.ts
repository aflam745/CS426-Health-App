// src/routes/prescriptions.ts
import { Router } from 'express';
import { query } from '../db';

interface Prescription {
  id: number;
  user_id: number;
  name: string;
  dosage?: string;
  frequency?: string;
  supply_remaining?: number;
  next_refill_date?: string;
  prescribing_doctor?: string;
  pharmacy?: string;
  instructions?: string;
  created_at: string;
  updated_at: string;
}

const router = Router();

// List for a User
router.get('/:userId', async (req, res, next) => {
  try {
    const rows = await query<Prescription>(
      'SELECT * FROM prescriptions WHERE user_id=$1',
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) { next(err) }
});

// Add or Update
router.post('/', async (req, res, next) => {
  const p = req.body as Partial<Prescription>;
  try {
    if (p.id) {
      // update
      const rows = await query<Prescription>(
        `UPDATE prescriptions SET
          name=$2,dosage=$3,frequency=$4,supply_remaining=$5,
          next_refill_date=$6,prescribing_doctor=$7,pharmacy=$8,
          instructions=$9,updated_at=now()
         WHERE id=$1 RETURNING *`,
        [p.id, p.name, p.dosage, p.frequency, p.supply_remaining,
         p.next_refill_date, p.prescribing_doctor, p.pharmacy, p.instructions]
      );
      res.json(rows[0]);
    } else {
      // insert
      const rows = await query<Prescription>(
        `INSERT INTO prescriptions
           (user_id,name,dosage,frequency,supply_remaining,
            next_refill_date,prescribing_doctor,pharmacy,instructions)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [p.user_id, p.name, p.dosage, p.frequency, p.supply_remaining,
         p.next_refill_date, p.prescribing_doctor, p.pharmacy, p.instructions]
      );
      res.status(201).json(rows[0]);
    }
  } catch (err) { next(err) }
});

export default router;
