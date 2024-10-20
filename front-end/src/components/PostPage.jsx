import { useState } from "react";
import { CustomTable } from "./CustomTable/CustomTable";
import { TextField, Typography, Button, Box, Stack } from "@mui/material";
import { BlueContainer } from "./Dashboard/Dashboard";
import { postsList } from "../constants";

const columns = [
  { label: "Title", key: "title" },
  { label: "Date Posted", key: "date" },
  { label: "Status", key: "status" },
  { label: "Salary", key: "salary" },
  { label: "Description", key: "description" },
  { label: "", key: "action" },
];

const PostsPage = () => {
  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(postsList);

  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    const filtered = postsList.filter((post) =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  const handleApply = (postId) => {
    alert(`Applied to job ID: ${postId}`);
  };

  const postsWithHandlers = filteredPosts.map((post) => ({
    ...post,
    action: (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleApply(post.id)}
        disabled={post.status === "Closed"}
      >
        Apply
      </Button>
    ),
  }));

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignContent="center"
      height="100vh"
    >
      <BlueContainer />
      <Box style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mt={2}>
          Available Jobs
        </Typography>
        <TextField
          label="Search by Title"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <CustomTable columns={columns} data={postsWithHandlers} />
      </Box>
    </Stack>
  );
};

export default PostsPage;
