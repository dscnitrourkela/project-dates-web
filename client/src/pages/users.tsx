/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { Box, Container } from '@mui/material';

import Head from 'next/head';

import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { NewCustomerListToolbar } from '../components/customer/new-customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useUserQuery } from '../graphql/graphql-types';
import { useOrgContext } from '../store/contexts/org.context';

const Page = () => {
  const [showNitrStudents, setShowNitrStudents] = useState(true);
  const { org } = useOrgContext();
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch,
    fetchMore,
  } = useUserQuery({
    variables: {
      festID: org?.festID,
      isNitrStudent: showNitrStudents,
      pagination: {
        skip: 0,
        take: 10,
      },
    },
  });

  // console.log(userData);

  const updateUserList = (param: boolean) => {
    setShowNitrStudents(param);
    refetch({
      festID: org?.festID,
      isNitrStudent: param,
      pagination: {
        skip: 0,
        take: 100,
      },
    });
  };

  const onPageChange = (pageNumber: number, rowsPerPage: number) => {
    fetchMore({
      variables: {
        festID: org?.festID,
        pagination: {
          skip: pageNumber * rowsPerPage,
          take: rowsPerPage,
        },
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
          <NewCustomerListToolbar />
          {/* <CustomerListToolbar
            showNitrStudents={showNitrStudents}
            setShowNitrStudents={updateUserList}
          />
          <Box sx={{ mt: 3 }}>{renderUsers()}</Box> */}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
