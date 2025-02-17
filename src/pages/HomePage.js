import React from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// Remove unused imports
// import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
// import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import StadiumIcon from '@mui/icons-material/Stadium';
import backgroundImage from '../assets/stadium.png'; // Add a high-quality stadium background

function HomePage() {
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
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Sports Ticket Booking
        </Typography>
        <Typography variant="h5" gutterBottom>
          Book your favorite sports event tickets easily & securely!
        </Typography>
        
        <Grid container spacing={3} justifyContent="center" mt={4}>
          <Grid item>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              startIcon={<StadiumIcon />}
              sx={{ backgroundColor: '#ff5722', '&:hover': { backgroundColor: '#e64a19' }, padding: '12px 24px', fontSize: '1.1rem' }}
            >
              Explore Events
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              startIcon={<SportsSoccerIcon />}
              sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' }, padding: '12px 24px', fontSize: '1.1rem' }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
