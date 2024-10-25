"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const userEmail = "test@gmail.com";
const profileStub = {
  name: "John Doe",
  avatar:
    "https://imgs.search.brave.com/b5PdydEZTaC3RqF33bkMLiwhHVLC5O2WCDbnmgeqQCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzVhL0pvaG5fRG9l/LF9ib3JuX0pvaG5f/Tm9tbWVuc2VuX0R1/Y2hhYy5qcGc",
  description: "Basic medical care, Medication administration",
};

const Profile: React.FC = () => {
  const [categorizedNFTs, setCategorizedNFTs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await useScaffoldReadContract({
          contractName: "UserRegistry",
          functionName: "getUserProfile",
          args: [userEmail],
        });

        if (!data) {
          console.error("User not found");
          return;
        }

        setUser(data);
      } catch (e) {
        console.error("Error fetching user profile", e);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (user) {
        try {
          const { data: reputationNFTs } = await useScaffoldReadContract({
            contractName: "ReputationNFT",
            functionName: "getTokensOfOwner",
            args: [user[9]], // user[9] is the address of the user
          });

          if (!reputationNFTs) {
            console.error("NFTs not found");
            return;
          }

          setCategorizedNFTs(reputationNFTs);
        } catch (e) {
          console.error("Error fetching NFTs", e);
        }
      }
    };

    fetchNFTs();
  }, [user]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar alt={profileStub.name} src={profileStub.avatar} sx={{ width: 150, height: 150 }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          {`${user?.[0]} ${user?.[1]}`}
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          {user?.[8]}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          align="center"
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          NFT Collection
        </Typography>
        {categorizedNFTs.length > 0 && (
          <>
            <Typography variant="body1" gutterBottom fontWeight="bold">
              Oro
            </Typography>
            <Grid container spacing={2}>
              {categorizedNFTs.map(nft => (
                <Grid item xs={12} sm={4} key={nft}>
                  <Card>
                    {/* <CardMedia component="img" height="150" image={nft.image} alt={nft.name} /> */}
                    <CardContent>
                      <Typography variant="body2" textAlign="center">
                        {nft}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
