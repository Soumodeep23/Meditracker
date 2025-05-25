import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Register = () => {
  const [form, setForm] = useState({ name: '', age: '', phone: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now login.');
        setForm({ name: '', age: '', phone: '', password: '' });
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Server error.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '2rem auto', boxShadow: 6 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <LocalHospitalIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" gutterBottom>Register</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Age" name="age" type="number" value={form.age} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
        </form>
        {message && <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Alert>}
      </CardContent>
    </Card>
  );
};

export default Register;
