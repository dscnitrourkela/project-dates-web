import React from 'react';

import { Box, Typography } from '@mui/material';

import Head from 'next/head';

const Page = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography>Avenue Dashboard</Typography>
    </Box>
  </>
);

export default Page;
