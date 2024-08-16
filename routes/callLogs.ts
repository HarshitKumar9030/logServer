import express, { Request, Response } from 'express';
import CallLog, { ICallLog } from '../models/callLog';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const callLogs = await CallLog.find();
    res.render('dashboard', { callLogs });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const callLogs: ICallLog[] = req.body;

  try {
    if (!Array.isArray(callLogs) || callLogs.length === 0) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    await CallLog.insertMany(callLogs);
    res.status(201).json({ message: 'Call logs saved successfully.' });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
});

export default router;
