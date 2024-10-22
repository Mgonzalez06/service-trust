import { CustomTable } from "../CustomTable/CustomTable";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import { ProfileModal } from "../Modals/ProfileModal";
import { applicantsList } from "../../constants";

const columns = [
  { label: "Name", key: "name" },
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
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={() => handleViewProfile(applicant)}
          sx={{ mr: 1 }}
        >
          See Profile
        </Button>
        <Button
          variant="outlined"
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
