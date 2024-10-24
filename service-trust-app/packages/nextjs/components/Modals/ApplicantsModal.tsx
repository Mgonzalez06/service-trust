"use client";

import { FC } from "react";
import { CustomModal } from "./CustomModal";
import { Applicants } from "~~/components/Applicants/Applicants";

interface ApplicantsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ApplicantsModal: FC<ApplicantsModalProps> = ({ open, handleClose }) => {
  return (
    <CustomModal open={open} handleClose={handleClose} title="Job Applicants">
      <Applicants />
    </CustomModal>
  );
};
