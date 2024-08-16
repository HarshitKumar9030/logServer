import express, { Request, Response } from 'express';
import CallLog from '../models/callLog';
import { authMiddleware } from '../middleware/auth';
import { CallLogDocument } from '../types/types';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const callLogs = await CallLog.find();
    res.json(callLogs);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const callLogs: CallLogDocument[] = req.body;

  try {
    if (!Array.isArray(callLogs) || callLogs.length === 0) {
      return res.status(400).json({ message: 'Invalid input data. Expected an array of call logs.' });
    }

    await CallLog.insertMany(callLogs);

    res.status(201).json({ message: 'Call logs saved successfully.' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

export default router;
