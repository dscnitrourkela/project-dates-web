import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';
import Head from 'next/head';

import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import {
  UserQuery,
  useUserLazyQuery
} from '../graphql/graphql-types';
import { useAuthContext } from '../store/contexts';
import { useOrgContext } from '../store/contexts/org.context';

const isEmailValid = (str) =>
  String(str)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

const Page = () => {
  const { user: loggedInUser } = useAuthContext();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<UserQuery['user'][0] | undefined>();
  const [fetchUser] = useUserLazyQuery();

  const onSearchClick = async () => {
    try {
      setUserLoading(true);
      const { data } = await fetchUser({
        variables: {
          email,
        },
      });
      setUser(data.user[0]);
      setUserLoading(false);
    } catch (error) {
      toast.error(error.message);
      setUserLoading(false);
    }
  };

  const onBlur = (e) =>
    !isEmailValid(e.target.value) ? setEmailError(true) : setEmailError(false);

  useEffect(() => {
    if (emailError) setEmailError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <>
      <Head>
        <title>Settings | Material Kit</title>
      </Head>
      {loggedInUser?.permissions?.superAdmin ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Permissions
            </Typography>

            <Card sx={{ mb: '1rem' }}>
              <CardContent>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'top',
                  }}
                >
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    placeholder="Enter User Email ID"
                    variant="outlined"
                    sx={{ marginRight: '0.5rem', width: '60%' }}
                    onBlur={onBlur}
                    error={emailError}
                    helperText={emailError && 'invalid email id'}
                  />
                  <Button
                    onClick={onSearchClick}
                    disabled={userLoading || !isEmailValid(email)}
                    variant="contained"
                    sx={{ marginRight: '0.5rem', width: '19%', height: '56px' }}
                    startIcon={
                      // @ts-ignore
                      <SvgIcon fontSize="small" color="white">
                        <SearchIcon />
                      </SvgIcon>
                    }
                  >
                    Search
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {user && (
              <>
                <SettingsNotifications searchedUser={user} />
                <AccountProfileDetails user={user} disableAll={true} />
              </>
            )}
          </Container>
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography>Not Authorized to view this Page</Typography>
          </Container>
        </Box>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
