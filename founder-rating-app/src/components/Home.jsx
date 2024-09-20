// founder-rating-app/src/components/Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/current_user', { withCredentials: true });
      if (response.data) {
        navigate('/search');
      } else {
        window.location.href = 'http://localhost:5000/auth/twitter';
      }
    } catch (error) {
      console.error(error);
      // Optionally, you can add some user feedback here
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6a1b9a', // Purple color
      },
      background: {
        default: '#f5f7fa',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Light purple ribbon with moving logos */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#e1bee7', // Light purple
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              animation: 'marquee 20s linear infinite',
            }}
          >
            {/* Add logos here */}
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src={`/logos/logo${(i % 5) + 1}.png`} // Ensure you have logos named logo1.png to logo5.png
                alt="Logo"
                style={{ height: '50px', marginRight: '20px' }}
              />
            ))}
          </Box>
        </Box>
        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" gutterBottom>
              Signal or Noise
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Help founders separate the signal from the noise. Leave your good/bad experience to save others time.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                marginTop: '30px',
                padding: '10px 30px',
                borderRadius: '25px',
                fontSize: '1.2rem',
              }}
            >
              Search for a Founder
            </Button>
          </Container>
        </Box>
      </Box>
      {/* Keyframes for marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default Home;