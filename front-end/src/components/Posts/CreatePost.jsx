import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';

export const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salaryRange: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job post created:', formData);
    alert('Job post created successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          New Job Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Job title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            label="Salary Range"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Create Post
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

