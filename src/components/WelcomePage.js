import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, 
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, 
  Snackbar, Alert, CircularProgress, Box, Paper 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Welcome.png'; // Import the background image

function WelcomePage() {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const userType = localStorage.getItem('userType');
  const userId = parseInt(localStorage.getItem('id'), 10); // Retrieve and convert `userId`
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5080/api/tickets/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data.slice(0, 3)); // Get the first 3 tickets
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleOpenDialog = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedTicket(null);
    setTicketCount(1);
  };

  const handleBookNow = async () => {
    if (!selectedTicket) return;
    if (!userId) {
      console.error('User ID is missing.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5080/api/tickets/book/${selectedTicket.id}`,
        { userId, count: ticketCount }, // Include userId
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update ticket count immediately in UI
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? { ...ticket, ticketCount: ticket.ticketCount - ticketCount }
            : ticket
        )
      );

      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTickets = () => {
    navigate('/add-tickets');
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
      <Container sx={{ position: 'relative', zIndex: 1, maxWidth: '800px', paddingBottom: '50px'}}> {/* Added paddingTop for User */}
        <Paper sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', paddingTop: userType === 'User' ? '80px' : '40px' }}> {/* Added paddingTop for User */}
          <Typography variant="h4" gutterBottom>
            Welcome, {firstName} {lastName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            You are logged in as {userType}
          </Typography>

          {userType === 'User' && (
            <>
              <Grid container spacing={3} justifyContent="center" mt={4}>
                {tickets.map((ticket) => (
                  <Grid item key={ticket.id} xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345, height: 420, display: 'flex', flexDirection: 'column' }}>
                      <CardMedia sx={{ height: 140 }} image={ticket.matchImageUrl} title={ticket.matchName} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5">{ticket.matchName}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                          {ticket.matchDescription}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                          Date: {new Date(ticket.matchDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                          Tickets Available: {ticket.ticketCount}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center' }}>
                        <Button size="small" variant="contained" color="primary" onClick={() => handleOpenDialog(ticket)}>
                          Book Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button component={Link} to="/matches" variant="contained" color="primary" sx={{ marginTop: '30px' }}>
                Show All Matches
              </Button>
            </>
          )}

          {userType === 'Admin' && (
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleAddTickets} 
              sx={{ marginTop: '30px' }}
            >
              Add Tickets
            </Button>
          )}

          {/* Booking Dialog */}
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Book Tickets</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the number of tickets you want to book.</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Ticket Count"
                type="number"
                fullWidth
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value)))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
              <Button onClick={handleBookNow} color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Book Now"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for Booking Confirmation */}
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
            <Alert severity="success">Congratulations, Booking successful!</Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
}

export default WelcomePage;
