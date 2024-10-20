// src/components/PostsPage.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';

const PostsPage = () => {
  // Stub data: Lista de publicaciones de trabajo simuladas con nuevas columnas
  const stubPosts = [
    {
      id: 1,
      title: 'Frontend Developer',
      date: '2024-01-10',
      status: 'Open',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      date: '2024-01-08',
      status: 'Closed',
    },
    {
      id: 3,
      title: 'Backend Developer',
      date: '2024-01-15',
      status: 'Open',
    },
  ];

  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(stubPosts);

  // Filtra las publicaciones por el título
  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    const filtered = stubPosts.filter(post =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostsPage;
