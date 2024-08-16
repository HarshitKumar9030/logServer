// server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import callLogsRouter from './routes/callLogs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/call-logs', callLogsRouter);

mongoose.connect('mongodb://localhost:27017/calllogsdb');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});