import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import callLogsRouter from './routes/callLogs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/call-logs', callLogsRouter);

mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});