import React, { useState } from 'react';

import { Box, Container } from '@mui/material';

import Head from 'next/head';

import { customers } from '../__mocks__/customers';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useUserQuery } from '../graphql/graphql-types';

const Page = () => {
  const [showNitrStudents, setShowNitrStudents] = useState(true);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch,
  } = useUserQuery({
    variables: {
      festID: ['innovision-2022'],
      isNitrStudent: showNitrStudents,
    },
  });

  const updateUserList = (param: boolean) => {
    setShowNitrStudents(param);
    refetch({
      festID: ['innovision-2022'],
      isNitrStudent: param,
    });
  };

  const renderUsers = () => {
    if (userLoading) return <>Loading...</>;
    if (userError) return <>Error...</>;

    return <CustomerListResults users={userData} customers={customers} />;
  };

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            showNitrStudents={showNitrStudents}
            setShowNitrStudents={updateUserList}
          />
          <Box sx={{ mt: 3 }}>{renderUsers()}</Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
