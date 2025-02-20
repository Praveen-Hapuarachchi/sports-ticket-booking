import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Paper, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
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
                  <Avatar>
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
  );
}

export default BookedPersons;
