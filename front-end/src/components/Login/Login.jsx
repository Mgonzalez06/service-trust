import {
  useMediaQuery,
  Stack,
  Typography,
  Input,
  Button,
  Box,
} from "@mui/material";
import { BlueContainer } from "../Dashboard/Dashboard";
import { loginUser } from "../../utils/userRegistryfunctions";

export const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  // const handleLogin = () => {
  // };

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
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Login
          </Typography>
          <Typography variant="body1" mt={4} sx={{ color: "black" }}>
            Email
          </Typography>
          <Input type="email" />
          <Typography variant="body1" mt={2} sx={{ color: "black" }}>
            Password
          </Typography>
          <Input type="password" />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained">Login</Button>
          </Box>
          <Typography
            variant="body2"
            mt={3}
            textAlign="center"
            sx={{ color: "black" }}
          >
            Don't have an account?
          </Typography>
          <Button
            variant="text"
            sx={{
              color: "blue",
              mt: 1,
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => (window.location.href = "/sign-up")}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
