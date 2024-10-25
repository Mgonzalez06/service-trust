"use client";

import { Box, styled, Button } from "@mui/material";
import Image from "next/image";
import logo from "~~/public/logo.png";
import home from "~~/public/home.png";
import { Header } from "~~/components/Header";
import { Information } from "~~/components/Information";
import { JobDescriptionModal } from "~~/components/Modals/JobDescriptionModal";

export const BlueContainer = styled(Box)(() => ({
  backgroundColor: "#00244a",
  height: "150px",
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

const LogoImage = styled("div")(() => ({
  width: "170px",
  height: "150px",
  position: "relative",
}));

const HomeImage = styled("div")(() => ({
  width: "100%",
  height: "70vh",
  position: "relative",
}));

const SignUpButton = styled(Button)(() => ({
  position: "absolute",
  top: "28px",
  right: "10px",
  color: "white",
  cursor: "pointer",
  textDecoration: "underline",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));

const Dashboard: React.FC = () => {
  return (
    <Box height="100vh">
      <BlueContainer>
        <HeaderContainer alignItems="center">
          <LogoImage>
            <Image src={logo} alt="Logo Service Trust" layout="fill" objectFit="contain" />
          </LogoImage>
          <Header />
        </HeaderContainer>
      </BlueContainer>
      <HomeImage>
        <Image src={home} alt="Home" layout="fill" objectFit="cover" />
      </HomeImage>
      <Information />
      {/* <JobDescriptionModal
        open={true}
        handleClose={() => {}}
        job={{
          title: "Cook",
          description: "We are looking for a cook to prepare meals for my family.",
          salary: "20/hour",
        }}
      /> */}
    </Box>
  );
};

export default Dashboard;
