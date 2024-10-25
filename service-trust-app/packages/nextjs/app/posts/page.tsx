"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CustomTable } from "./CustomTable/CustomTable";
import { TextField, Typography, Button, Box, Stack } from "@mui/material";
import { BlueContainer } from "../dashboard/page";
import { JobDescriptionModal } from "./Modals/JobDescriptionModal";
import { ApplicantsModal } from "./Modals/ApplicantsModal";
import { useRouter } from "next/router";

const columns = [
  { label: "Title", key: "title" },
  { label: "Date Posted", key: "startDate" },
  { label: "Status", key: "status" },
  { label: "", key: "action" },
];

const Posts: React.FC = () => {
  const router = useRouter(); // Hook de Next.js para la navegación
  const user = "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C005992f";
  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [JobDescriptionModalOpen, setJobDescriptionModalOpen] = useState(false);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Función para cargar los trabajos desde el contrato
  // const loadJobs = async () => {
  //   const jobs = await getAllJobs();
  //   setFilteredPosts(jobs);
  // };

  // useEffect(() => {
  //   // Cargar los trabajos cuando el componente se monte
  //   loadJobs();
  // }, []);

  // const handleFilterChange = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   setFilter(searchValue);
  //   const filtered = filteredPosts.filter((post) =>
  //     post.title.toLowerCase().includes(searchValue)
  //   );
  //   setFilteredPosts(filtered);
  // };

  // const handleApply = (post) => {
  //   setSelectedJob(post);
  //   if (post.client === user) {
  //     setApplicantsModalOpen(true);
  //   } else {
  //     setJobDescriptionModalOpen(true);
  //   }
  // };

  // const postsWithHandlers = filteredPosts.map((post) => ({
  //   ...post,
  //   action: (
  //     <Button
  //       variant="outlined"
  //       color="secondary"
  //       onClick={() => handleApply(post)}
  //     >
  //       See
  //     </Button>
  //   ),
  // }));

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignContent="center"
      height="100vh"
    >
      <BlueContainer />
      <Box style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center" mt={2}>
          Available Jobs
        </Typography>
        <TextField
          label="Search by Title"
          value={filter}
          // onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/create_post")} // Redirect to create post page
          style={{ marginBottom: "16px" }} // Add some space below the button
        >
          Create Post
        </Button>
        {/* <CustomTable columns={columns} data={postsWithHandlers} /> */}
      </Box>
      <JobDescriptionModal
        open={JobDescriptionModalOpen}
        handleClose={() => setJobDescriptionModalOpen(false)}
        job={selectedJob}
      />
      {/* <ApplicantsModal
        open={applicantsModalOpen}
        handleClose={() => setApplicantsModalOpen(false)}
        applicants={selectedJob?.applicants}
      /> */}
    </Stack>
  );
};

export default Posts;