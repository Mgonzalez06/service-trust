import { Stack, Typography, Input, Button } from "@mui/material";
import { BlueContainer } from "../Dashboard/Dashboard";

export const Login = () => {
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
          width="fit-content"
          height="100%"
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Login
          </Typography>
          <Typography variant="h6" mt={4} sx={{ color: "black" }}>
            Username
          </Typography>
          <Input type="text" />
          <Typography variant="h6" mt={2} sx={{ color: "black" }}>
            Password
          </Typography>
          <Input type="password" />
          <Button variant="contained" sx={{ mt: 5 }}>
            Login
          </Button>

          {/* Pregunta para registrarse */}
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
            onClick={() => (window.location.href = "/register")} // Redirige a la página de Sign Up
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
