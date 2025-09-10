import React, { useState } from 'react';
import { dashboardAPI } from '../services/api';
import { CreateDataPointRequest } from '../types';
import {
  FormCard,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
} from './styled';

interface DataFormProps {
  onDataAdded: () => void;
}

const DataForm: React.FC<DataFormProps> = ({ onDataAdded }) => {
  const [formData, setFormData] = useState<CreateDataPointRequest>({
    label: '',
    value: 0,
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = ['Sales', 'Marketing', 'Development', 'Support', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await dashboardAPI.createDataPoint(formData);
      setMessage({ type: 'success', text: 'Data point added successfully!' });
      setFormData({ label: '', value: 0, category: '' });
      onDataAdded();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add data point. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? Number(value) : value,
    }));
  };

  return (
    <FormCard>
      <h2>Add New Data Point</h2>
      {message && (
        <div style={{ 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="label">Label</Label>
          <Input
            type="text"
            id="label"
            name="label"
            value={formData.label}
            onChange={handleChange}
            required
            placeholder="Enter data label"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="value">Value</Label>
          <Input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="Enter value"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Data Point'}
        </Button>
      </Form>
    </FormCard>
  );
};

export default DataForm;
