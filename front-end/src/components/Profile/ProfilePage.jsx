import React from "react";
import {
  Avatar,
  Typography,
  Container,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { categorizeNFTs, nftsStub } from "../../constants";
const profileStub = {
  name: "John Doe",
  avatar:
    "https://imgs.search.brave.com/b5PdydEZTaC3RqF33bkMLiwhHVLC5O2WCDbnmgeqQCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzVhL0pvaG5fRG9l/LF9ib3JuX0pvaG5f/Tm9tbWVuc2VuX0R1/Y2hhYy5qcGc",
  description: "Basic medical care, Medication administration",

  nfts: nftsStub,
};

export const ProfilePage = () => {
  const categorizedNFTs = categorizeNFTs(profileStub.nfts);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt={profileStub.name}
            src={profileStub.avatar}
            sx={{ width: 150, height: 150 }}
          />
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          {profileStub.name}
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          {profileStub.description}
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Skills
        </Typography>
        <Typography variant="body2" align="center">
          {profileStub.skills}
        </Typography>

        <Typography
          variant="h5"
          align="center"
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          NFT Collection
        </Typography>

        {/* NFTs de Oro */}
        {categorizedNFTs.Oro.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Oro
            </Typography>
            <Grid container spacing={2}>
              {categorizedNFTs.Oro.map((nft) => (
                <Grid item xs={12} sm={4} key={nft.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={nft.image}
                      alt={nft.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{nft.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
          </>
        )}

        {/* NFTs de Plata */}
        {categorizedNFTs.Plata.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Plata
            </Typography>
            <Grid container spacing={2}>
              {categorizedNFTs.Plata.map((nft) => (
                <Grid item xs={12} sm={4} key={nft.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={nft.image}
                      alt={nft.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{nft.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
          </>
        )}

        {/* NFTs de Bronce */}
        {categorizedNFTs.Bronce.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Bronce
            </Typography>
            <Grid container spacing={2}>
              {categorizedNFTs.Bronce.map((nft) => (
                <Grid item xs={12} sm={4} key={nft.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={nft.image}
                      alt={nft.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{nft.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};
