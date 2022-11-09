import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';

import { useUserLazyQuery } from '../../graphql/graphql-types';
import { useOrgContext } from '../../store/contexts/org.context';
import { AccountProfile } from '../account/account-profile';
import { AccountProfileDetails } from '../account/account-profile-details';

const isEmailValid = (str) =>
  String(str)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export const NewCustomerListToolbar = () => {
  const { org } = useOrgContext();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  // undefined undefined false
  const [fetchUser, { loading, error: error, data }] = useUserLazyQuery({
    variables: {
      festID: org?.festID,
      email,
    },
  });

  const onSearchClick = () => fetchUser();
  const onBlur = (e) =>
    !isEmailValid(e.target.value) ? setEmailError(true) : setEmailError(false);

  useEffect(() => {
    if (emailError) setEmailError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Registered Users
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
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
                disabled={loading || !isEmailValid(email)}
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
      </Box>

      <Box sx={{ mt: 3 }}>
        {data?.user.length && (
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile name={data.user[0].name} img={data.user[0].photo} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={data.user[0]} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
