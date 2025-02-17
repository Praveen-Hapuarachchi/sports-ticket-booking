import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import backgroundImage from '../assets/REGISTER.png'; // Import the background image
import HowToRegIcon from '@mui/icons-material/HowToReg'; // Import the HowToRegIcon

function RegisterForm() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5080/api/auth/register', data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

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
              rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } }}
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

            <FormControl fullWidth margin="normal">
              <InputLabel>User Type</InputLabel>
              <Controller
                name="userType"
                control={control}
                defaultValue="User"
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" fullWidth disabled={loading} endIcon={<HowToRegIcon />} sx={{ marginTop: '20px', padding: '10px 0', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterForm;
