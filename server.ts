import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import callLogsRouter from './routes/callLogs';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import CallLog from './models/callLog';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.JWT_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/api/call-logs', callLogsRouter);

mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', authMiddleware, async (req: Request, res: Response) => {
  try {
    const callLogs = await CallLog.find(); 
    res.render('dashboard', { callLogs }); 
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
