// founder-rating-app/src/components/Profile.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Box, Grid, LinearProgress, Button, TextField } from '@mui/material';
import axios from 'axios';

function Profile() {
  const { name } = useParams();
  const [founder, setFounder] = useState(null);
  const [ratings, setRatings] = useState({ nice: 0, talent: 0, intelligence: 0, experience: 0 });
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [founderDetails, setFounderDetails] = useState({ name: '', company: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/founders/${name}`)
      .then((response) => {
        setFounder(response.data);
        if (!response.data.name || !response.data.company) {
          setIsEditing(true);
          setFounderDetails({ name: response.data.name || '', company: response.data.company || '' });
        }
      })
      .catch(() => setFounder(null));
  }, [name]);

  const handleRatingChange = (e) => {
    setRatings({ ...ratings, [e.target.name]: Number(e.target.value) });
  };

  const submitRating = () => {
    axios.post(
      'http://localhost:5000/api/founders/rate',
      { name: founder.name, ratings: { ...ratings, comment } },
      { withCredentials: true }
    );
  };

  const updateFounderDetails = () => {
    axios
      .post(
        'http://localhost:5000/api/founders/update',
        { identifier: name, ...founderDetails },
        { withCredentials: true }
      )
      .then((response) => {
        setFounder(response.data);
        setIsEditing(false);
      });
  };

  if (!founder) {
    return (
      <Container style={{ marginTop: '50px', textAlign: 'center' }}>
        <Typography variant="h5">Founder not found.</Typography>
      </Container>
    );
  }

  if (isEditing) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Typography variant="h5">Enter Founder Details</Typography>
        <TextField
          label="Name"
          value={founderDetails.name}
          onChange={(e) => setFounderDetails({ ...founderDetails, name: e.target.value })}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Company"
          value={founderDetails.company}
          onChange={(e) => setFounderDetails({ ...founderDetails, company: e.target.value })}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={updateFounderDetails}>
          Save
        </Button>
      </Container>
    );
  }

  const averageRating = (category) => {
    const total = founder.ratings.reduce((sum, r) => sum + r[category], 0);
    return (total / founder.ratings.length).toFixed(1);
  };

  const overallRating = (
    (Number(averageRating('nice')) +
    Number(averageRating('talent')) +
    Number(averageRating('intelligence')) +
    Number(averageRating('experience'))) / 4
  ).toFixed(1);

  const signalOrNoise = overallRating >= 3 ? 'Signal' : 'Noise';

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box textAlign="center">
        <Avatar alt={founder.name} src={founder.profilePicture || '/default-avatar.png'} style={{ width: '150px', height: '150px', margin: 'auto' }} />
        <Typography variant="h4">{founder.name}</Typography>
        <Typography variant="h6">{founder.company}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{signalOrNoise}</Typography>
      </Box>
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        {['nice', 'talent', 'intelligence', 'experience'].map((category) => (
          <Grid item xs={6} sm={3} key={category}>
            <Typography variant="subtitle1" align="center">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>
            <LinearProgress variant="determinate" value={(averageRating(category) / 5) * 100} />
            <Typography variant="h6" align="center">{averageRating(category)}</Typography>
          </Grid>
        ))}
      </Grid>
      <Box style={{ marginTop: '50px' }}>
        <Typography variant="h5">Leave a Rating</Typography>
        <Grid container spacing={2}>
          {['nice', 'talent', 'intelligence', 'experience'].map((category) => (
            <Grid item xs={6} sm={3} key={category}>
              <TextField label={category.charAt(0).toUpperCase() + category.slice(1)} type="number" name={category} inputProps={{ min: 1, max: 5 }} onChange={handleRatingChange} fullWidth />
            </Grid>
          ))}
        </Grid>
        <TextField label="Comment" multiline rows={4} variant="outlined" fullWidth style={{ marginTop: '20px' }} onChange={(e) => setComment(e.target.value)} />
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={submitRating}>Submit</Button>
      </Box>
    </Container>
  );
}

export default Profile;