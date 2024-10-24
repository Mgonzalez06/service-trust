"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

export const Information: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      textAlign={"center"}
    >
      <Box width="70%" py={3}>
        <Typography variant="h4" sx={{ color: "gray" }}>
          "Our platform leverages NFTs to build and verify caregivers' reputations, creating new economic opportunities. This enables caregivers from diverse backgrounds to showcase their skills and find employment, supporting economic mobility and empowering caregivers to grow their careers. While also reducing risks and helping elders get the proper care they need when in chronic sickness or age disability."
        </Typography>
        <Typography
          variant="h5"
          textAlign="justify"
          mt={2}
          sx={{ color: "#005d96" }}
        >
          We firmly believe that the qualification that a service provider
          receives, based on care experiences, is essential so that our clients
          can make informed and safe decisions. This evaluation not only
          reflects the quality and commitment of the provider, but also provides
          users with a clear perspective of the experience of others, allowing
          them to confidently choose the right person to address their specific
          needs. By prioritizing the opinions and ratings of those who have
          lived those experiences, we seek to empower our clients in their
          search for exceptional care.
        </Typography>
      </Box>
    </Box>
  );
};
