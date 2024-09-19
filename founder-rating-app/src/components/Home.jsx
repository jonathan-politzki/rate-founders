import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

function Home() {
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchName.trim()) {
      navigate(`/profile/${searchName}`);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px', textAlign: 'center' }}>
      <TextField
        label="Search Founder"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '20px' }}>
        Search
      </Button>
    </Container>
  );
}

export default Home;