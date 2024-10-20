import { Box, Typography } from "@mui/material";

export const Information = () => {
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
        <Typography variant="h3" sx={{ color: "gray" }}>
          "At Service Trust, we are committed to bridging the gap between
          individuals in need of caregiving and professional, trustworthy
          caregivers. Our platform provides a seamless and secure means for
          users to locate the care they require."
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
