import React from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';

import Head from 'next/head';

import { Google as GoogleIcon } from '../icons/google';
import { useAuthContext } from '../store/contexts';

const Login = () => {
  const { signIn } = useAuthContext();

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Button
                color="error"
                fullWidth
                onClick={signIn}
                size="large"
                startIcon={<GoogleIcon />}
                variant="contained"
              >
                Login with Google
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Login;
