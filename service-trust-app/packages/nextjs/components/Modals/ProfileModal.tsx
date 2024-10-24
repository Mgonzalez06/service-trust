"use client";

import { FC } from "react";
import { CustomModal } from "./CustomModal";
import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
  Typography,
  Grid,
} from "@mui/material";

interface NFT {
  id: string | number;
  name: string;
  image: string;
}

interface Applicant {
  name: string;
  email: string;
  skills: string;
  birthdate: string;
  phone: string;
  country: string;
  city: string;
  nationality: string;
  nfts?: NFT[];
}

interface ProfileModalProps {
  open: boolean;
  handleClose: () => void;
  applicant?: Applicant | null | undefined;
}

export const ProfileModal: FC<any> = ({ open, handleClose, applicant }) => {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title="Applicant Profile"
    >
      <Box
        sx={{
          p: 3,
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Name
            </Typography>
            <Typography variant="body1">{applicant?.name}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
            <Typography variant="body1">{applicant?.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Skills
            </Typography>
            <Typography variant="body1">{applicant?.skills}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Birthdate
            </Typography>
            <Typography variant="body1">{applicant?.birthdate}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Phone
            </Typography>
            <Typography variant="body1">{applicant?.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Country
            </Typography>
            <Typography variant="body1">{applicant?.country}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              City
            </Typography>
            <Typography variant="body1">{applicant?.city}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Nationality
            </Typography>
            <Typography variant="body1">{applicant?.nationality}</Typography>
          </Grid>
        </Grid>

        <Box>
          <Typography variant="body1" gutterBottom fontWeight="bold">
            NFTs
          </Typography>
          <Grid container spacing={2}>
            {applicant?.nfts?.map((nft : any) => (
              <Grid item xs={12} sm={4} key={nft.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={nft.image}
                    alt={nft.name}
                  />
                  <CardContent>
                    <Typography variant="body1">{nft.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
        </Box>
      </Box>
    </CustomModal>
  );
};
