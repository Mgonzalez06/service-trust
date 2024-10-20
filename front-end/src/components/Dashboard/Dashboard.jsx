import { Box, styled, Button } from "@mui/material";
import logo from "../../Images/logo.png";
import home from "../../Images/home.png";
import { Header } from "./Header";
import { Information } from "./Information";
import { JobDescriptionModal } from "../Modals/JobDescriptionModal";

export const BlueContainer = styled(Box)(() => ({
  backgroundColor: "#005d96",
  height: "90px",
  textAlign: "center",
  position: "relative",
  width: "100%",
}));

const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  borderRadius: "10px",
  position: "absolute",
  bottom: 0,
  width: "100%",
}));

const LogoImage = styled("img")(() => ({
  width: "110px",
  height: "90px",
}));

const HomeImage = styled("img")(() => ({
  width: "100%",
  height: "80vh",
  objectFit: "cover",
}));

const SignUpButton = styled(Button)(() => ({
  position: "absolute",
  top: "8px",
  right: "10px",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));

export const Dashboard = () => {
  return (
    <Box height="100vh">
      <BlueContainer>
        <SignUpButton onClick={() => (window.location.href = "/sign-up")}>
          Sign Up
        </SignUpButton>
        <HeaderContainer alignItems="center">
          <LogoImage src={logo} alt="Logo Service Trust" />
          <Header />
        </HeaderContainer>
      </BlueContainer>
      <HomeImage src={home} alt="Home" />
      <Information />
      {/* <JobDescriptionModal
        open={true}
        handleClose={() => {}}
        job={{
          title: "Cook",
          description:
            "We are looking for a cook to prepare meals for my family.",
          salary: "20/hour",
        }}
      /> */}
    </Box>
  );
};
