import { CustomModal } from "./CustomModal";
import { Applicants } from "../Applicants/Applicants";

export const ApplicantsModal = ({ open, handleClose }) => {
  return (
    <CustomModal open={open} handleClose={handleClose} title="Job Applicants">
      <Applicants />
    </CustomModal>
  );
};
