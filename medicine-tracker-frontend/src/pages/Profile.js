import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const name = localStorage.getItem('name') || '';
  const phone = localStorage.getItem('phone') || '';
  return (
    <Card sx={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <CardContent>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, margin: '0 auto' }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Profile</Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle1"><strong>Name:</strong> {name}</Typography>
          <Typography variant="subtitle1"><strong>Phone:</strong> {phone}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;
