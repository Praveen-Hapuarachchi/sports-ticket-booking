import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, List, 
  ListItem, ListItemAvatar, Avatar, 
  ListItemText, CircularProgress, Button, 
  Snackbar, Alert, Dialog, DialogTitle, 
  DialogContent, DialogActions, Paper 
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Profile.png'; // Import the background image

function Profile() {
  const [bookings, setBookings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [matches, setMatches] = useState([]); // Store match details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const navigate = useNavigate();

  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          if (userType === "User") {
            const bookingsResponse = await axios.get('http://localhost:5080/api/tickets/mybookings', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookingsResponse.data);
          } else if (userType === "Admin") {
            const ticketsResponse = await axios.get('http://localhost:5080/api/tickets/my-tickets', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setTickets(ticketsResponse.data);
          }
        } catch (err) {
          setError("Failed to load data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [token, userType]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5080/api/tickets/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [token]);

  const getMatchImage = (ticketId) => {
    const match = matches.find((m) => m.id === ticketId);
    return match ? match.matchImageUrl : '';
  };

  if (!token) return <div>No token found. Please log in.</div>;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const decodedToken = JSON.parse(jsonPayload);
  const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || 'Email not available';

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleOpenDialog = (bookingId) => {
    setSelectedBookingId(bookingId);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setSelectedBookingId(null);
    setDialogOpen(false);
  };

  const handleCancelBooking = async () => {
    setCancelLoading(true);
    try {
      await axios.delete(`http://localhost:5080/api/tickets/cancel/${selectedBookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== selectedBookingId));
      setSnackbarMessage("Booking cancelled successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to cancel booking.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(err);
    } finally {
      setCancelLoading(false);
      handleCloseDialog();
    }
  };

  const handleViewBookedPersons = (ticketId) => {
    navigate(`/booked-persons/${ticketId}`);
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
      <Container sx={{ position: 'relative', zIndex: 1, maxWidth: '600px', paddingBottom: '40px' ,marginTop: '50px', marginBottom: '50px'}}>
        <Paper sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <i className="bi bi-person-circle" style={{ fontSize: '6rem' }}></i>
          </Box>
          <Typography variant="h4" gutterBottom>{firstName} {lastName}</Typography>
          <Typography variant="h6" gutterBottom>User ID: {userId}</Typography>
          <Typography variant="h6" gutterBottom>User Type: {userType}</Typography>
          <Typography variant="h6" gutterBottom>Email: {email}</Typography>

          {userType === "User" && (
            <Box sx={{ marginTop: '30px' }}>
              <Typography variant="h5" gutterBottom>Bookings:</Typography>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : bookings.length === 0 ? (
                <Typography>No bookings found for this user.</Typography>
              ) : (
                <List>
                  {bookings.map((booking) => (
                    <ListItem key={booking.id} sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemAvatar>
                        <Avatar src={getMatchImage(booking.ticketId)} alt={booking.ticketName} sx={{ width: 50, height: 50 }} />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={booking.ticketName} 
                        secondary={
                          <>
                            <Typography variant="body2" component="span">Count: {booking.count}</Typography>
                          </>
                        } 
                      />
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleOpenDialog(booking.id)}
                        disabled={cancelLoading}
                      >
                        {cancelLoading ? 'Cancelling...' : 'Cancel'}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}

          {userType === "Admin" && (
            <Box sx={{ marginTop: '30px' }}>
              <Typography variant="h5" gutterBottom>Tickets Added by You:</Typography>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : tickets.length === 0 ? (
                <Typography>No tickets found for this admin.</Typography>
              ) : (
                <List>
                  {tickets.map((ticket) => (
                    <ListItem key={ticket.id} sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemAvatar>
                        <Avatar src={ticket.matchImageUrl} alt={ticket.matchName} sx={{ width: 50, height: 50 }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={ticket.matchName}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">{ticket.matchDescription}</Typography>
                            <Typography variant="body2" component="span">Date: {new Date(ticket.matchDate).toLocaleString()}</Typography>
                            <Typography variant="body2" component="span">Tickets Available: {ticket.ticketCount}</Typography>
                          </>
                        }
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleViewBookedPersons(ticket.id)}
                      >
                        View Booked Persons
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}

          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to cancel this booking?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">No</Button>
              <Button onClick={handleCancelBooking} color="error" disabled={cancelLoading}>
                {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  );
}

export default Profile;
