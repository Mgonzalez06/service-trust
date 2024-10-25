"use client";

import {
  useMediaQuery,
  Stack,
  Typography,
  Input,
  Button,
  Box,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const BlueContainer = styled(Box)(() => ({
    backgroundColor: "#00244a",
    height: "150px",
    textAlign: "center",
    position: "relative",
    width: "100%",
  }));

const Login: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  const handleLoginClick = async () => {
    try{
      const { data: userProfile } = await useScaffoldReadContract({
        contractName: "UserRegistry",
        functionName: "getUserProfile",
        args: [
          email,
        ]
      });

      if (!userProfile) {
        console.error("User not found");
        return;
      }

      if (userProfile[10] === password) {
        router.push("/posts");
      } else {
        console.error("Invalid password");
      }
    } catch (e) {
      console.error("Error logging in", e);
    }
  };

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
          <Typography variant="body1" mt={4} sx={{ color: "black" }} >
            Email
          </Typography>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Typography variant="body1" mt={2} sx={{ color: "black" }}>
            Password
          </Typography>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleLoginClick}>Login</Button>
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
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;