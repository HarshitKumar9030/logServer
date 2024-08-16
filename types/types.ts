export interface CallLog {
    NUMBER: string;
    TYPE: number;
    DATE: number;
    DURATION: number;
  }
  
  export interface CallLogDocument extends CallLog, Document {}