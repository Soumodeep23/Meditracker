import React from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactUs = () => (
  <Card sx={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
    <CardContent>
      <Typography variant="h5" sx={{ mb: 2 }}>Contact Us</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <EmailIcon sx={{ mr: 1 }} />
        <Typography variant="body1">support@medicinetracker.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <PhoneIcon sx={{ mr: 1 }} />
        <Typography variant="body1">+1-234-567-8901</Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>For any queries, please reach out to us or send a message below!</Typography>
      <form>
        <TextField label="Your Email" type="email" fullWidth margin="normal" required />
        <TextField label="Message" multiline rows={3} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>Send Message</Button>
      </form>
    </CardContent>
  </Card>
);

export default ContactUs;
