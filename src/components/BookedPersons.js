import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Paper, ListItemAvatar, Avatar, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/TICKETS.png'; // Import the background image

function BookedPersons() {
  const { ticketId } = useParams();
  const [bookedPersons, setBookedPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedPersons = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5080/api/tickets/bookings/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookedPersons(response.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedPersons();
  }, [ticketId]);

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
      <Container sx={{ position: 'relative', zIndex: 1, maxWidth: '800px', paddingBottom: '50px' }}>
        <Paper sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom>Booked Persons:</Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : bookedPersons.length === 0 ? (
            <Typography>No bookings found for this ticket.</Typography>
          ) : (
            <List>
              {bookedPersons.map((person, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'purple' }}>
                      <i className="bi bi-person-circle"></i>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={person.userFullName} secondary={`Count: ${person.ticketCount}`} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default BookedPersons;
