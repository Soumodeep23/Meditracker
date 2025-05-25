import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

const AddMedicine = () => {
  const [form, setForm] = useState({ name: '', time: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login to add medicines.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/medicines/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Medicine added successfully!');
        setForm({ name: '', time: '' });
      } else {
        setMessage(data.message || 'Failed to add medicine.');
      }
    } catch (err) {
      setMessage('Server error.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '2rem auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Add Medicine</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Medicine Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Time to Take (HH:MM)" name="time" type="time" value={form.time} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Medicine</Button>
        </form>
        {message && <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Alert>}
      </CardContent>
    </Card>
  );
};

export default AddMedicine;
