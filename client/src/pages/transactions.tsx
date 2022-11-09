import React from 'react';

import { Box, Container } from '@mui/material';

import MUIDataTable from 'mui-datatables';
import Head from 'next/head';

import { DashboardLayout } from '../components/dashboard-layout';
import { useTransactionQuery } from '../graphql/graphql-types';
import { useOrgContext } from '../store/contexts/org.context';

const Transactions = () => {
  const { org } = useOrgContext();
  const { loading, error, data } = useTransactionQuery({
    variables: {
      orgID: org?.id,
    },
  });

  const renderUsers = () => {
    if (loading) return <>Loading...</>;
    // if (error) return <>Error...</>;

    return (
      <MUIDataTable
        title={'User List'}
        data={data?.transaction.map((transaction, index) => ({
          ...transaction,
          ...transaction.user,
          '#': index,
        }))}
        columns={[
          '#',
          ...Object.keys(data?.transaction[0] || {}),
          ...Object.keys(data?.transaction[0]?.user || {}),
        ]}
        options={{
          count: 3000,
          filter: true,
          sort: true,
          search: true,
          filterType: 'dropdown',
          selectableRows: false,
        }}
      />
    );
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
          <Box sx={{ mt: 3 }}>{renderUsers()}</Box>
        </Container>
      </Box>
    </>
  );
};

Transactions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Transactions;
