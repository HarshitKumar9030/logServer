// @ts-nocheck
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
});

router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', { message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', { message: 'Invalid credentials' });
    }
    req.session.userId = user._id.toString(); 
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;
