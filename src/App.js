import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
import Matches from './components/Matches'; // Import the Matches component
import AddTickets from './components/AddTickets'; // Import the AddTickets component
import Profile from './components/Profile'; // Import the Profile component
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flex: '1 0 auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/matches" element={<Matches />} /> {/* Add the Matches route */}
              <Route path="/add-tickets" element={<AddTickets />} /> {/* Add the AddTickets route */}
              <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
