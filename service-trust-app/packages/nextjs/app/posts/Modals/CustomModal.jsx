import { Modal, Box, Typography, Button, styled } from "@mui/material";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "2px solid #fff",
}));

export const CustomModal = ({
  open,
  handleClose,
  title,
  children,
  showClose = true,
}) => {
  return (
    <StyledModal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "white",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          minWidth: 500,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          sx={{ p: 2 }}
        >
          {title}
        </Typography>
        <Box sx={{ p: 2 }}>{children}</Box>
        {showClose && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Box>
        )}
      </Box>
    </StyledModal>
  );
};
