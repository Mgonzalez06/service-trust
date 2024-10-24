"use client";

import { Box, Button, Typography } from "@mui/material";
import { CustomModal } from "./CustomModal";
import { FC } from "react";

interface Job {
  title: string;
  description: string;
  salary: string;
}

interface JobDescriptionModalProps {
  open: boolean;
  handleClose: () => void;
  job?: Job | null;
}

export const JobDescriptionModal: FC<JobDescriptionModalProps> = ({
  open,
  handleClose,
  job,
}) => {
  return (
    <CustomModal open={open} handleClose={handleClose} title={job?.title}>
      <Box width="100%" textAlign="center">
        <Typography variant="body2">{job?.description}</Typography>
        <Typography variant="body1">
          <b>Salary: </b>
          {job?.salary}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, alignSelf: "center" }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
