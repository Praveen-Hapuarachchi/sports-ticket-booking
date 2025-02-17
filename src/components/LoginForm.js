import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import LoginIcon from '@mui/icons-material/Login'; // Import the LoginIcon
import backgroundImage from '../assets/LOGIN.png'; // Import the background image

function LoginForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5080/api/auth/login', data);
      const { token, firstName, lastName, userType, id } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('userType', userType);
      localStorage.setItem('id', id);
      
      login();
      navigate('/welcome');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
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
      <Container sx={{ position: 'relative', zIndex: 1, maxWidth: '300px' }}> {/* Decreased maxWidth */}
        <Paper sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email format" }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              endIcon={!loading && <LoginIcon />} // Add the LoginIcon as an end icon
              sx={{ marginTop: '20px', padding: '10px 0', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginForm;
