import mongoose, { Schema } from 'mongoose';
import { CallLogDocument } from '../types/types';

const callLogSchema = new Schema<CallLogDocument>({
  NUMBER: {
    type: String,
    required: true,
  },
  TYPE: {
    type: Number,
    required: true,
  },
  DATE: {
    type: Number,
    required: true,
  },
  DURATION: {
    type: Number,
    required: true,
  },
});

const CallLog = mongoose.model<CallLogDocument>('CallLog', callLogSchema);
export default CallLog;