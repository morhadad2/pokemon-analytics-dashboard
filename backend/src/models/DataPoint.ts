import mongoose, { Document, Schema } from 'mongoose';

export interface IDataPoint extends Document {
  label: string;
  value: number;
  category: string;
  date: Date;
}

const DataPointSchema: Schema = new Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IDataPoint>('DataPoint', DataPointSchema);
