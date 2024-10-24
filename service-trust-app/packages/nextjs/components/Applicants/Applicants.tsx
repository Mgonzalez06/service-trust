"use client";

import { CustomTable } from "~~/components/CustomTable/CustomTable";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import { ProfileModal } from "~~/components/Modals/ProfileModal";

interface Applicant {
  name: string;
  [key: string]: any;
}

interface Column {
  label: string;
  key: string;
}

const columns: Column[] = [
  { label: "Name", key: "name" },
  { label: "", key: "action" },
];

const applicantsList: Applicant[] = [
  { name: "John Doe" },
  { name: "Jane Smith" },
];

export const Applicants: React.FC = () => {
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [applicant, setApplicant] = useState<Applicant | null>(null);

  const handleViewProfile = (applicant: Applicant) => {
    setApplicant(applicant);
    setProfileModalOpen(true);
  };

  const handleAcceptApplication = (applicant: Applicant) => {
    console.log("Accepted application for:", applicant);
  };

  const applicantsWithHandlers = applicantsList.map((applicant) => ({
    ...applicant,
    action: (
      <Box key={applicant.name} display="flex">
        <Button
          variant="contained"
          onClick={() => handleViewProfile(applicant)}
          sx={{ mr: 1 }}
        >
          See Profile
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAcceptApplication(applicant)}
        >
          Hire
        </Button>
      </Box>
    ),
  }));

  return (
    <Box>
      <CustomTable columns={columns} data={applicantsWithHandlers} />
      <ProfileModal
        applicant={applicant}
        open={profileModalOpen}
        handleClose={() => setProfileModalOpen(false)}
      />
    </Box>
  );
};
