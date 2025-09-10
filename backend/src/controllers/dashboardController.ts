import { Request, Response } from 'express';
import DataPoint from '../models/DataPoint';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const data = await DataPoint.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

export const createDataPoint = async (req: Request, res: Response) => {
  try {
    const { label, value, category } = req.body;
    const dataPoint = new DataPoint({
      label,
      value,
      category,
      date: new Date()
    });
    
    const savedDataPoint = await dataPoint.save();
    res.status(201).json(savedDataPoint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating data point' });
  }
};

export const updateDataPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { label, value, category } = req.body;
    
    const updatedDataPoint = await DataPoint.findByIdAndUpdate(
      id,
      { label, value, category },
      { new: true }
    );
    
    if (!updatedDataPoint) {
      return res.status(404).json({ message: 'Data point not found' });
    }
    
    res.json(updatedDataPoint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data point' });
  }
};

export const deleteDataPoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedDataPoint = await DataPoint.findByIdAndDelete(id);
    
    if (!deletedDataPoint) {
      return res.status(404).json({ message: 'Data point not found' });
    }
    
    res.json({ message: 'Data point deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data point' });
  }
};
