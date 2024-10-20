import { useMediaQuery, Stack, Typography, Input, Button } from "@mui/material";
import { BlueContainer } from "../Dashboard/Dashboard";

export const SignUp = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignContent="center"
      height="100vh"
    >
      <BlueContainer />
      <Stack
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        alignItems="center"
      >
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={isMobile ? "90%" : "30%"}
          height="100%"
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Sign Up
          </Typography>
          <Typography variant="h6" mt={4} sx={{ color: "black" }}>
            First Name
          </Typography>
          <Input type="text" />
          <Typography variant="h6" mt={2} sx={{ color: "black" }}>
            Last Name
          </Typography>
          <Input type="text" />
          <Typography variant="h6" mt={2} sx={{ color: "black" }}>
            Email
          </Typography>
          <Input type="email" />
          <Button variant="contained" sx={{ mt: 5 }}>
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
