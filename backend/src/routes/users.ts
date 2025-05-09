// src/routes/users.ts
import { Router } from 'express';
import { query } from '../db';

interface IUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
}

const router = Router();

// Create
router.post('/', async (req, res, next) => {
  const { name, email, phone, date_of_birth } = req.body as Partial<IUser>;
  try {
    const rows = await query<IUser>(`
      INSERT INTO users (name,email,phone,date_of_birth)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, email, phone, date_of_birth]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err) }
});

// List
router.get('/', async (_req, res, next) => {
  try {
    const rows = await query<IUser>('SELECT * FROM users');
    res.json(rows);
  } catch (err) { next(err) }
});

// Get User by id
router.get<{ id: string }>('/:id', async (req, res, next) => {
  const userId = Number(req.params.id);
  try {
    const rows = await query<IUser>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update
router.put<{ id: string }>('/:id', async (req, res, next) => {
  const userId = Number(req.params.id);
  const { name, email, phone, notifications, date_of_birth } = req.body;

  try {
    const rows = await query<IUser>(`
      UPDATE users
         SET name= $2,
             email= $3,
             phone= $4,
             notifications= $5,
             date_of_birth= $6,
             updated_at= now()
       WHERE id= $1
    RETURNING *`,
      [userId, name, email, phone, notifications, date_of_birth]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
