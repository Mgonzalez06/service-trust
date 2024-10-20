import { Box, styled } from "@mui/material";
import { ApplicantsModal } from "../Modals/ApplicantsModal";
import logo from "../../Images/logo.png";
import { Header } from "./Header";

export const BlueContainer = styled(Box)(() => ({
  backgroundColor: "#005d96",
  height: "40%",
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

export const Dashboard = () => {
  return (
    <Box height="100vh">
      <BlueContainer>
        <HeaderContainer alignItems="center">
          <LogoImage src={logo} alt="Logo Service Trust" />
          <Header />
        </HeaderContainer>
      </BlueContainer>
      <ApplicantsModal />
    </Box>
  );
};
