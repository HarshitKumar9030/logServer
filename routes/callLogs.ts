import express, { Request, Response } from 'express';
import CallLog from '../models/callLog';
import { CallLog as CallLogType } from '../types/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const callLogs = await CallLog.find();
    res.json(callLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const callLogs = req.body.map((log: CallLogType) => new CallLog(log));
  try {
    await CallLog.insertMany(callLogs);
    res.status(201).json({ message: 'Call logs saved successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;