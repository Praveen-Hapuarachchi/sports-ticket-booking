import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5080/api/tickets/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleClickOpen = (matchId) => {
    setSelectedMatchId(matchId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMatchId(null);
    setTicketCount(1);
  };

  const handleBookNow = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id'); // ✅ Get userId from localStorage

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      await axios.post(`http://localhost:5080/api/tickets/book/${selectedMatchId}`, 
        { 
          userId: parseInt(userId), // ✅ Ensure it's a number
          count: ticketCount 
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.id === selectedMatchId
            ? { ...match, ticketCount: match.ticketCount - ticketCount }
            : match
        )
      );

      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      console.error('Error booking ticket:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom>
        All Matches
      </Typography>
      <Grid container spacing={4}>
        {matches.map((match) => (
          <Grid item key={match.id} xs={12} sm={6} md={4}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={match.matchImageUrl}
                title={match.matchName}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {match.matchName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {match.matchDescription}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Date: {new Date(match.matchDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Tickets Available: {match.ticketCount}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" variant="contained" color="primary" onClick={() => handleClickOpen(match.id)}>
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Tickets</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the number of tickets you want to book.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Ticket Count"
            type="number"
            fullWidth
            value={ticketCount}
            onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBookNow} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Book Now"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Congratulations, Booking successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Matches;
