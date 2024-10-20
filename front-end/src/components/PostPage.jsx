import { useState } from "react";
import { CustomTable } from "./CustomTable/CustomTable";
import { TextField, Typography, Button, Box, Stack } from "@mui/material";
import { BlueContainer } from "./Dashboard/Dashboard";
import { postsList } from "../constants";
import { JobDescriptionModal } from "./Modals/JobDescriptionModal";
import { ApplicantsModal } from "./Modals/ApplicantsModal";

const columns = [
  { label: "Title", key: "title" },
  { label: "Date Posted", key: "date" },
  { label: "Status", key: "status" },
  { label: "", key: "action" },
];

const PostsPage = () => {
  const user = "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C005992f";
  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(postsList);
  const [JobDescriptionModalOpen, setJobDescriptionModalOpen] = useState(false);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    const filtered = postsList.filter((post) =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  const handleApply = (post) => {
    setSelectedJob(post);
    if (post.owner === user) {
      setApplicantsModalOpen(true);
    } else {
      setJobDescriptionModalOpen(true);
    }
  };

  const postsWithHandlers = filteredPosts.map((post) => ({
    ...post,
    action: (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleApply(post)}
        disabled={post.status === "Closed"}
      >
        See
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
      <JobDescriptionModal
        open={JobDescriptionModalOpen}
        handleClose={() => setJobDescriptionModalOpen(false)}
        job={selectedJob}
      />
      <ApplicantsModal
        open={applicantsModalOpen}
        handleClose={() => setApplicantsModalOpen(false)}
        applicants={selectedJob?.applicants}
      />
    </Stack>
  );
};

export default PostsPage;
