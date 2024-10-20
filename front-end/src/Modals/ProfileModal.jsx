import { CustomModal } from "./CustomModal";
import { CustomTable } from "../CustomTable/CustomTable";
import { Button, Box } from "@mui/material";
import { useState } from "react";

export const ProfileModal = ({ open, handleClose, applicant }) => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Skills", key: "skills" },
    { label: "NFTs", key: "nfts" },
  ];

  const rows = [
    {
      name: applicant?.name,
      email: applicant?.email,
      skills: applicant?.skills.join(", "),
      nfts: applicant?.nfts.join(", "),
    },
  ];

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title="Applicant Profile"
    >
      <CustomTable columns={columns} data={rows} />
    </CustomModal>
  );
};
