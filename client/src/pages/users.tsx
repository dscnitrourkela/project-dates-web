/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import {
  Box,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';

import Head from 'next/head';

import { CustomerListResults } from '../components/customer/customer-list-results';
import { NewCustomerListToolbar } from '../components/customer/new-customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useUserQuery } from '../graphql/graphql-types';
import { useOrgContext } from '../store/contexts/org.context';

const STAGES = {
  SEARCH: 'Search User',
  LIST: 'List User',
};

const Page = () => {
  const [stage, setStage] = useState(STAGES.SEARCH);

  const { org } = useOrgContext();
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    fetchMore,
  } = useUserQuery({
    variables: {
      festID: org?.festID,
      pagination: {
        skip: 0,
        take: 10,
      },
      orgID: org.id,
    },
  });

  const onPageChange = (pageNumber: number, rowsPerPage: number) => {
    fetchMore({
      variables: {
        festID: org?.festID,
        pagination: {
          skip: pageNumber * rowsPerPage,
          take: rowsPerPage,
        },
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          launches: {
            ...fetchMoreResult.user,
            launches: [...prev.user, ...fetchMoreResult.user],
          },
        };
      },
    });
  };

  const renderUsers = () => {
    if (userLoading) return <>Loading...</>;
    if (userError) return <>Error...</>;

    return <CustomerListResults users={userData} onPageChange={onPageChange} />;
  };

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Registered Users
          </Typography>
          <Tabs
            value={stage}
            sx={{ marginBottom: '1rem' }}
            onChange={(e, newStage) => setStage(newStage)}
          >
            <Tab value={STAGES.SEARCH} label="Search User" />
            <Tab value={STAGES.LIST} label="User List" />
          </Tabs>

          {stage === STAGES.SEARCH ? (
            <NewCustomerListToolbar />
          ) : (
            <Box sx={{ mt: 3 }}>{renderUsers()}</Box>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
