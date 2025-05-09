// src/routes/users.ts
import { Router, Request, Response, NextFunction} from "express"; 
import { query } from '../db';
import bcrypt from "bcrypt";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
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
router.get<{ id:string }>('/:id', async (req, res, next) => {
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
router.put<{ id:string }>('/:id', async (req, res, next) => {
  const userId = Number(req.params.id);
  const { name, email, phone, date_of_birth } = req.body;

  try {
    const rows = await query<IUser>(`
      UPDATE users
         SET name          = $2,
             email         = $3,
             phone         = $4,
             date_of_birth = $5,
             updated_at    = now()
       WHERE id            = $1
    RETURNING *`,
      [userId, name, email, phone, date_of_birth]
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

//sign up route
router.post('/signup', async (req, res, next) => {
  const { name, email, password, phone, date_of_birth } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await query<IUser>(`
      INSERT INTO users (name, email, password, phone, date_of_birth)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, date_of_birth, created_at, updated_at
    `, [name, email, hashed, phone, date_of_birth]);

    res.status(201).json(result[0]);
  } catch (err) {
    next(err);
  }
});

//handler for login route
const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await query<{ password: string } & Partial<IUser>>(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const user = result[0];
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      date_of_birth: user.date_of_birth,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (err) {
    next(err);
  }
};

//login route
router.post("/login", loginHandler);



export default router;
