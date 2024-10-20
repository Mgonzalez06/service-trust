// src/components/PostsPage.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const PostsPage = () => {
  // Stub data: Lista de publicaciones de trabajo simuladas
  const stubPosts = [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Looking for a Frontend Developer with experience in React.',
      salary: '$60,000/year',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      description: 'Need a UI/UX Designer to work on mobile and web apps.',
      salary: '$50,000/year',
    },
    {
      id: 3,
      title: 'Backend Developer',
      description: 'Experienced Backend Developer required for cloud services.',
      salary: '$70,000/year',
    },
  ];

  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(stubPosts);

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {post.description}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Salary: {post.salary}
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
