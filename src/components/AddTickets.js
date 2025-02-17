import React, { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import backgroundImage from '../assets/TICKET.jpg'; // Import the background image

function AddTickets() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5080/api/tickets/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/matches');
    } catch (error) {
      console.error('Error adding ticket:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
        <Paper sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            Add Tickets
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="matchName"
              control={control}
              defaultValue=""
              rules={{ required: "Match Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Match Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.matchName}
                  helperText={errors.matchName?.message}
                />
              )}
            />

            <Controller
              name="matchDescription"
              control={control}
              defaultValue=""
              rules={{ required: "Match Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Match Description"
                  fullWidth
                  margin="normal"
                  error={!!errors.matchDescription}
                  helperText={errors.matchDescription?.message}
                />
              )}
            />

            <Controller
              name="matchDate"
              control={control}
              defaultValue=""
              rules={{ required: "Match Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Match Date"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  error={!!errors.matchDate}
                  helperText={errors.matchDate?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />

            <Controller
              name="matchImageUrl"
              control={control}
              defaultValue=""
              rules={{ required: "Match Image URL is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Match Image URL"
                  fullWidth
                  margin="normal"
                  error={!!errors.matchImageUrl}
                  helperText={errors.matchImageUrl?.message}
                />
              )}
            />

            <Controller
              name="ticketCount"
              control={control}
              defaultValue=""
              rules={{ required: "Ticket Count is required", min: { value: 1, message: "Ticket Count must be at least 1" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ticket Count"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.ticketCount}
                  helperText={errors.ticketCount?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ marginTop: '20px', padding: '10px 0', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Add Ticket"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddTickets;
