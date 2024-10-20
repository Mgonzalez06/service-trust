import { CustomTable } from "../CustomTable/CustomTable";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import { ProfileModal } from "../Modals/ProfileModal";
import { applicantsList } from "../constants";

const columns = [
  { label: "Name", key: "name" },
  { label: "Applied On", key: "appliedOn" },
  { label: "", key: "action" },
];

export const Applicants = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [applicant, setApplicant] = useState(null);

  const handleViewProfile = (applicant) => {
    setApplicant(applicant);
    setProfileModalOpen(true);
  };

  const handleAcceptApplication = (applicant) => {
    console.log("Accepted application for:", applicant);
  };

  const applicantsWithHandlers = applicantsList.map((applicant) => ({
    ...applicant,
    action: (
      <Box>
        <Button
          variant="contained"
          onClick={() => handleViewProfile(applicant)}
          sx={{ mr: 1 }}
        >
          Ver Profile
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
