import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';

import { useUserLazyQuery } from '../../graphql/graphql-types';

const isEmailValid = (str) =>
  String(str)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export const NewCustomerListToolbar = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);

  const [fetchUser, { loading, error: fetchError, data }] = useUserLazyQuery({
    variables: {
      email: search,
    },
  });

  const onSearchClick = () => fetchUser();
  const onBlur = (e) => (!isEmailValid(e.target.value) ? setError(true) : setError(false));

  useEffect(() => {
    if (error) {
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                placeholder="Enter User Email ID"
                variant="outlined"
                sx={{ marginRight: '0.5rem', width: '60%' }}
                onBlur={onBlur}
                error={error}
                helperText={error && 'invalid email id'}
              />
              <Button
                onClick={onSearchClick}
                disabled={loading || !isEmailValid(search)}
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
    </Box>
  );
};
