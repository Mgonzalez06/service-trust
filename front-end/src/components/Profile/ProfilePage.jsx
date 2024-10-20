import React from 'react';
import { Avatar, Typography, Container, Box, Paper, Card, CardMedia, CardContent, Grid, Divider } from '@mui/material';

const profileStub = {
  name: 'John Doe',
  avatar: 'https://imgs.search.brave.com/b5PdydEZTaC3RqF33bkMLiwhHVLC5O2WCDbnmgeqQCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzVhL0pvaG5fRG9l/LF9ib3JuX0pvaG5f/Tm9tbWVuc2VuX0R1/Y2hhYy5qcGc',
  skills: 'JavaScript, React, Node.js, Express, MongoDB',
  description: 'A passionate full-stack developer with experience in building web applications using JavaScript, React, and Node.js. Always eager to learn new technologies and improve coding skills.',

  nfts: [
    // NFTs de Oro
    { id: 1, name: 'Golden Sword', type: 'Oro', image: 'https://png.pngtree.com/png-vector/20240419/ourmid/pngtree-golden-sword-logo-png-image_12298155.png' },
    { id: 2, name: 'Golden Crown', type: 'Oro', image: 'https://st2.depositphotos.com/1007566/11843/v/950/depositphotos_118435034-stock-illustration-crown-gold-golden-icon.jpg' },
    // NFTs de Plata
    { id: 3, name: 'Silver Shield', type: 'Plata', image: 'https://t3.ftcdn.net/jpg/09/06/49/88/360_F_906498816_Qc9RgCLMkMapM5chX7T3Filsxpw4b83P.jpg' },
    // NFTs de Bronce
    { id: 4, name: 'Bronze Helmet', type: 'Bronce', image: 'https://wiki.melvoridle.com/images/e/e2/Bronze_Helmet_%28item%29.png' },
    { id: 5, name: 'Bronze Sword', type: 'Bronce', image: 'https://steamusercontent-a.akamaihd.net/ugc/779532750883148042/989EE9B780B1D0D35D65D9FC262790EE73E16A9B/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true' },
    { id: 6, name: 'Bronze Armor', type: 'Bronce', image: 'https://pics.craiyon.com/2023-11-25/Co6iyfXnTD-BCGORRFzoRg.webp' },
  ],
};


const categorizeNFTs = (nfts) => {
  const categories = {
    Oro: [],
    Plata: [],
    Bronce: [],
  };
  
  nfts.forEach((nft) => {
    categories[nft.type].push(nft);
  });
  
  return categories;
};

export const ProfilePage = () => {
  const categorizedNFTs = categorizeNFTs(profileStub.nfts);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
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

        <Typography variant="h5" align="center" style={{ marginTop: '30px', marginBottom: '20px' }}>
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
            <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
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
            <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
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

