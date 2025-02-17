import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BackgroundLetterAvatars from './Avatar';
import logo from '../assets/LOGO.png';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const handleTitleClick = () => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'light-blue', padding: 1 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: { xs: 60, sm: 70 },
            width: 'auto',
            marginRight: 2,
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer', // Add cursor pointer to indicate it's clickable
          }}
          onClick={handleTitleClick} // Add onClick handler
        >
          Sports Ticket Booking
        </Typography>

        {isAuthenticated ? (
          <>
            <IconButton onClick={handleAvatarClick}>
              <BackgroundLetterAvatars />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
                <LogoutIcon sx={{ marginLeft: 1 }} />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              endIcon={<LoginIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': { backgroundColor: 'lightgray' },
                marginRight: 2,
                padding: '10px 20px',
                fontSize: '1rem',
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              endIcon={<HowToRegIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': { backgroundColor: 'lightgray' },
                padding: '10px 20px',
                fontSize: '1rem',
              }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
