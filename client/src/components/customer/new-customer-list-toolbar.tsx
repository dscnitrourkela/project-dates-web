/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';

import {
  TransactionQuery,
  UserQuery,
  useTransactionLazyQuery,
  useUserLazyQuery
} from '../../graphql/graphql-types';
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
  const [userLoading, setUserLoading] = useState(false);
  const [txnLoading, setTxnLoading] = useState(false);
  const [user, setUser] = useState<UserQuery['user'][0] | undefined>();
  const [transaction, setTransaction] = useState<TransactionQuery['transaction'][0] | undefined>();

  // undefined undefined false
  const [fetchUser] = useUserLazyQuery();
  const [fetchTransactionDetails] = useTransactionLazyQuery();

  const onSearchClick = async () => {
    try {
      setUserLoading(true);
      setTxnLoading(true);
      const { data } = await fetchUser({
        variables: {
          email,
        },
      });
      setUser(data.user[0]);
      setUserLoading(false);

      const { data: txnData } = await fetchTransactionDetails({
        variables: {
          userID: data.user[0]?.id,
          orgID: org.id,
        },
      });
      setTransaction(txnData?.transaction[0]);
      setTxnLoading(false);
    } catch (error) {
      toast.error(error.message);
      setUserLoading(false);
      setTxnLoading(false);
    }
  };
  const onBlur = (e) =>
    !isEmailValid(e.target.value) ? setEmailError(true) : setEmailError(false);

  useEffect(() => {
    if (emailError) setEmailError(false);
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
                disabled={userLoading || txnLoading || !isEmailValid(email)}
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
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {user && <AccountProfile name={user.name} img={user.photo} />}

            {transaction && (
              <Card sx={{ marginTop: '1rem' }}>
                <CardContent>
                  <List>
                    <ListItem disablePadding sx={{ margin: '0px 0px 1rem 0px' }}>
                      <ListItemIcon>
                        <CurrencyRupeeIcon />
                      </ListItemIcon>
                      <ListItemText>Amount: {transaction.amount}</ListItemText>
                    </ListItem>
                    <ListItem disablePadding sx={{ margin: '0px 0px 1rem 0px' }}>
                      <ListItemIcon>
                        <ReceiptLongIcon />
                      </ListItemIcon>
                      <ListItemText>Transaction ID: {transaction.transactionID}</ListItemText>
                    </ListItem>
                    <ListItem disablePadding sx={{ margin: '0px 0px 1rem 0px' }}>
                      <ListItemIcon>
                        <CelebrationIcon />
                      </ListItemIcon>
                      <ListItemText>Type: {transaction.type}</ListItemText>
                    </ListItem>
                    <ListItem disablePadding sx={{ margin: '0px 0px 1rem 0px' }}>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText>Time: {transaction.timestamp}</ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {user && <AccountProfileDetails user={user} />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
