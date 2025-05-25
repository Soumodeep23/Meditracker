import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Alert, CircularProgress, Box, Button } from '@mui/material';

const MedicineSVG = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
    <svg width="90" height="90" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="24" width="40" height="28" rx="8" fill="#90caf9"/>
      <rect x="20" y="8" width="24" height="32" rx="8" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
      <rect x="28" y="20" width="8" height="16" rx="4" fill="#1976d2"/>
      <rect x="32" y="28" width="8" height="4" rx="2" fill="#ff9800"/>
    </svg>
  </Box>
);

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const name = localStorage.getItem('name') || '[Name]';

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your medicines.');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:3000/medicines/list', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) {
          setError('Failed to fetch medicines.');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        setError('Server error.');
      }
      setLoading(false);
    };
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:3000/medicines/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setMedicines(medicines.filter(med => med._id !== id));
      }
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
      <CardContent>
        <MedicineSVG />
        <Typography variant="h5" gutterBottom>Hello {name}, welcome to our website</Typography>
        <Typography variant="body1" gutterBottom>We are here for you to help you to maintain the timings of your medicines.</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Your Medicines</Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : medicines.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>No medicines added yet.</Alert>
        ) : (
          <List>
            {medicines.map((med) => (
              <ListItem key={med._id} divider
                secondaryAction={
                  <Button color="error" variant="outlined" size="small" onClick={() => handleDelete(med._id)}>
                    Delete
                  </Button>
                }
              >
                <ListItemText primary={med.name} secondary={`Time: ${med.time}`} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default Home;
