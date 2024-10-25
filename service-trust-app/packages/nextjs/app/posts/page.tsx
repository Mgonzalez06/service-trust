"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { CustomTable } from "~~/components/CustomTable/CustomTable";
import { TextField, Typography, Button, Box, Stack } from "@mui/material";
import { BlueContainer } from "../dashboard/page";
import { JobDescriptionModal } from "~~/components/Modals/JobDescriptionModal";
import { ApplicantsModal } from "~~/components/Modals/ApplicantsModal";
import { useRouter } from "next/navigation";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface Job {
  id: number;
  title: string;
  startDate: string;
  status: string;
  client: string;
  applicants?: any[];
  description: string,
  salary: number;
}

const columns = [
  { label: "Title", key: "title" },
  { label: "Date Posted", key: "startDate" },
  { label: "Status", key: "status" },
  { label: "", key: "action" },
];

const Posts: React.FC = () => {
  const router = useRouter(); // Hook de Next.js para la navegación
  const user = "0x0969F4786c8FDC835e5Ba9cF6a734Cc9C005992f";
  const [filter, setFilter] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Job[]>([]);
  const [JobDescriptionModalOpen, setJobDescriptionModalOpen] = useState<boolean>(false);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Usar useScaffoldReadContract para obtener los trabajos desde el contrato inteligente
  const { data: jobs, isLoading } = useScaffoldReadContract({
    contractName: "JobListing",
    functionName: "getAllJobs", // La función para obtener trabajos
  });

  // Actualizar el estado cuando los trabajos cambian
  useEffect(() => {
    if (jobs) {
      // Mapea los trabajos a la estructura esperada del estado filteredPosts
      const formattedJobs = jobs.map((job: any, index: number) => ({
        id: index,
        title: job.title,
        startDate: new Date(parseInt(job.startDate) * 1000).toLocaleDateString(), // Formato de fecha
        status: job.completed ? "Closed" : job.canceled ? "Canceled" : "Open",
        client: job.client,
        applicants: job.applicants,
      }));
      setFilteredPosts(formattedJobs);
    }
  }, [jobs]);

  // Manejar cambios en el filtro de búsqueda
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setFilter(searchValue);
    const filtered = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  // Manejar la aplicación a un trabajo
  const handleApply = (post: Job) => {
    setSelectedJob(post);
    if (post.client === user) {
      setApplicantsModalOpen(true);
    } else {
      setJobDescriptionModalOpen(true);
    }
  };

  const postsWithHandlers = filteredPosts.map((post) => ({
    ...post,
    action: (
      <Button
        variant="outlined"
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
        <Typography variant="h6" fontWeight="bold" textAlign="center" mt={2}>
          Available Jobs
        </Typography>
        <TextField
          label="Search by Title"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/create_post")} // Redirigir a la página de creación de publicaciones
          style={{ marginBottom: "16px" }} // Agregar un margen debajo del botón
        >
          Create Post
        </Button>
        {!isLoading && (
          <CustomTable columns={columns} data={postsWithHandlers} />
        )}
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

export default Posts;
