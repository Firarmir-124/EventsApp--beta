import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactUs = () => {
  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <PhoneIcon />
        <Typography sx={{ ml: 2 }} variant="h6" component="p">
          0(555)234-009
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <FacebookIcon />
        <Typography sx={{ ml: 2 }} variant="h6" component="p">
          Почта
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <TwitterIcon />
        <Typography sx={{ ml: 2 }} variant="h6" component="p">
          Почта
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
        <LinkedInIcon />
        <Typography sx={{ ml: 2 }} variant="h6" component="p">
          Почта
        </Typography>
      </Box>
    </Paper>
  );
};

export default ContactUs;
