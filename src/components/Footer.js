import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#263238', padding: '40px 0', marginTop: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}> {/* Increased spacing */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              We are a leading platform for booking sports event tickets. Our mission is to make it easy and secure for fans to book tickets for their favorite sports events.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              Email: <Link href="mailto:hapup14@gmail.com" sx={{ color: '#b0bec5', textDecoration: 'none' }}>hapup14@gmail.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              Phone: <Link href="tel:+94779255150" sx={{ color: '#b0bec5', textDecoration: 'none' }}>+94 779 255 150</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton 
                component={Link} 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener"
                sx={{ color: '#b0bec5', '&:hover': { color: '#3b5998' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                component={Link} 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener"
                sx={{ color: '#b0bec5', '&:hover': { color: '#1DA1F2' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                component={Link} 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener"
                sx={{ color: '#b0bec5', '&:hover': { color: '#C13584' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                component={Link} 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener"
                sx={{ color: '#b0bec5', '&:hover': { color: '#0077b5' } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" sx={{ color: '#b0bec5' }}>
            &copy; {new Date().getFullYear()} Sports Ticket Booking. All rights reserved.
          </Typography>
          <Link 
            href="/privacy-policy" 
            color="inherit" 
            sx={{ marginLeft: '10px', color: '#b0bec5', textDecoration: 'none', '&:hover': { color: '#fff' } }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
