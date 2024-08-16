import mongoose, { Schema, Document } from 'mongoose';

export interface ICallLog extends Document {
  NUMBER: string;
  TYPE: number;
  DATE: number;
  DURATION: number;
}

const callLogSchema = new Schema<ICallLog>({
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

const CallLog = mongoose.model<ICallLog>('CallLog', callLogSchema);
export default CallLog;