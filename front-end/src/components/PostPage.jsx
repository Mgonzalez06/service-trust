import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Button } from '@mui/material';

const PostsPage = () => {
  // Stub data actualizada con más columnas
  const stubPosts = [
    {
      id: 1,
      title: 'Frontend Developer',
      date: '2024-01-10',
      status: 'Open',
      salary: '$60,000/year',
      description: 'Frontend Developer with React experience.',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      date: '2024-01-08',
      status: 'Closed',
      salary: '$50,000/year',
      description: 'UI/UX Designer for mobile and web apps.',
    },
    {
      id: 3,
      title: 'Backend Developer',
      date: '2024-01-15',
      status: 'Open',
      salary: '$70,000/year',
      description: 'Backend Developer with cloud services experience.',
    },
  ];

  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(stubPosts);

  // Maneja el filtro de búsqueda
  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    const filtered = stubPosts.filter(post =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  const handleApply = (postId) => {
    alert(`Applied to job ID: ${postId}`);
  };

  const handleViewDetails = (postId) => {
    alert(`Viewing details for job ID: ${postId}`);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>

      <TextField
        label="Search by Title"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ocupación</TableCell>
              <TableCell>Fecha de Publicación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Salario</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>{post.salary}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleApply(post.id)}
                    disabled={post.status === 'Closed'}
                  >
                    Aplicar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostsPage;
