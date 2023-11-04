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
} from '@mui/material';

import { Search as SearchIcon } from 'icons/search';

import {
  TransactionQuery,
  UserQuery,
  useTransactionLazyQuery,
  useUserLazyQuery,
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
  const [user, setUser] = useState<UserQuery['user']['data'][0] | undefined>();
  const [transaction, setTransaction] = useState<
    TransactionQuery['transaction']['data'][0] | undefined
  >();

  const [fetchUser] = useUserLazyQuery();
  const [fetchTransactionDetails] = useTransactionLazyQuery();

  const checkUserIn = ({ selfID }) => {
    setUser((current) => ({
      ...current,
      ca: ['innovision-2023-' + selfID],
    }));
  };

  const onSearchClick = async () => {
    try {
      setUserLoading(true);
      setTxnLoading(true);
      const {
        data: { user: users },
      } = await fetchUser({
        variables: {
          email,
          orgID: org.id,
        },
      });

      if (!users?.data[0]) {
        throw new Error('User not registered for Innovision 2022');
      }
      setUser(users?.data[0]);
      setUserLoading(false);

      const {
        data: { transaction: txnData },
      } = await fetchTransactionDetails({
        variables: {
          userID: users?.data[0]?.id,
          orgID: org.id,
        },
      });
      setTransaction(txnData?.data[0]);
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
            {user && <AccountProfileDetails user={user} checkUserIn={checkUserIn} />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
