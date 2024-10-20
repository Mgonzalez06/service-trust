import { Box, styled, Button } from "@mui/material";
import logo from "../../Images/logo.png";
import home from "../../Images/home.png";
import { Header } from "./Header";
import { Information } from "./Information";

export const BlueContainer = styled(Box)(() => ({
  backgroundColor: "#005d96",
  height: "35%",
  textAlign: "center",
  position: "relative",
  width: "100%",
}));

const HeaderContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: "10px",
  position: "absolute",
  bottom: 0,
  width: "100%",
}));

const LogoImage = styled("img")(() => ({
  width: "187px",
  height: "166px",
}));

const HomeImage = styled("img")(() => ({
  width: "100%",
  height: "80vh",
  objectFit: "cover",
}));

const SignUpButton = styled(Button)(() => ({
  position: "absolute",
  top: "20px", // Espaciado desde la parte superior
  right: "20px", // Espaciado desde la parte derecha
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
        {/* Botón de Sign Up en la esquina superior derecha */}
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
    </Box>
  );
};
