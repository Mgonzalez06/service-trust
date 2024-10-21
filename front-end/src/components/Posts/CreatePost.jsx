// src/components/JobPostForm.js
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
    console.log('Publicación de trabajo creada:', formData);
    alert('Publicación de trabajo creada con éxito!');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Crear Publicación de Trabajo
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Título del Trabajo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Descripción"
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
            label="Rango Salarial"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Fecha Límite para Aplicar"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Crear Publicación
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

