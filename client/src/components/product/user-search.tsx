import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Card,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';

import { AccountProfileDetails } from '../../components/account/account-profile-details';
import {
  useEventRegistrationLazyQuery,
  UserQuery,
  useUserLazyQuery
} from '../../graphql/graphql-types';
import { useOrgContext } from '../../store/contexts/org.context';

const isEmailValid = (str) =>
  String(str)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

const UserSearch = ({ eventId }) => {
  const { org } = useOrgContext();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<UserQuery['user'][0] | undefined>();
  const [notRegistered, setNotRegister] = useState(false);
  const [notRegisteredForInno, setNotRegisteredForInno] = useState(false);
  const [fetchUser] = useUserLazyQuery();
  const [fetchUserRegistration] = useEventRegistrationLazyQuery();

  const onSearchClick = async () => {
    setUserLoading(true);
    setNotRegister(false);
    setNotRegisteredForInno(false);

    try {
      const { data: userData } = await fetchUser({
        variables: {
          email,
          orgID: org.id,
        },
      });

      if (!userData.user.length) {
        setUserLoading(false);
        return setNotRegisteredForInno(true);
      }

      const { data } = await fetchUserRegistration({
        variables: {
          eventId,
          userId: userData.user[0].id,
        },
      });

      if (data.eventRegistration.length) {
        setUserLoading(false);
        return setUser(userData.user[0]);
      }

      setUserLoading(false);
      return setNotRegister(true);
    } catch (error) {
      setUserLoading(false);
      toast.error(error.message);
    }
  };

  const onBlur = (e) =>
    !isEmailValid(e.target.value) ? setEmailError(true) : setEmailError(false);

  useEffect(() => {
    if (emailError) setEmailError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <Box maxWidth="lg" sx={{ minWidth: '600px' }}>
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

      {user && <AccountProfileDetails user={user} disableAll={true} />}

      {notRegisteredForInno && !user && (
        <Card sx={{ mt: '1rem' }}>
          <Typography color="error">User Not registered for the Innovision 2022</Typography>
        </Card>
      )}

      {notRegistered && !user && (
        <Card sx={{ mt: '1rem' }}>
          <Typography color="error">User Not registered for the Event</Typography>
        </Card>
      )}
    </Box>
  );
};

export default UserSearch;
