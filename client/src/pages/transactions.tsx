import React, { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';

import MUIDataTable from 'mui-datatables';
import Head from 'next/head';

import { DashboardLayout } from '../components/dashboard-layout';
import { useTransactionQuery } from '../graphql/graphql-types';
import { useAuthContext } from '../store/contexts';
import { useOrgContext } from '../store/contexts/org.context';

const Transactions = () => {
  const { user } = useAuthContext();
  const { org } = useOrgContext();
  const [pageNumber, setPageNumber] = useState<number | undefined>(0);
  const [rowNumber, setRowNumber] = useState(10);
  const { loading, error, data, fetchMore } = useTransactionQuery({
    variables: {
      orgID: org?.id,
      pagination: {
        skip: 0,
        take: 10,
      },
    },
  });

  const onPageChange = (pN: number, rPP: number) => {
    fetchMore({
      variables: {
        orgID: org?.id,
        pagination: {
          skip: pN * rPP,
          take: rPP,
        },
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          launches: {
            ...fetchMoreResult.transaction,
            launches: [...prev.transaction, ...fetchMoreResult.transaction],
          },
        };
      },
    });
  };

  const renderUsers = () => {
    if (loading) return <>Loading...</>;
    if (error) return <>Error...</>;

    return (
      data && (
        <MUIDataTable
          title={'User List'}
          data={data.transaction.map((transaction, index) => ({
            ...transaction,
            ...transaction.user,
            '#': pageNumber * rowNumber + index + 1,
          }))}
          columns={[
            '#',
            ...Object.keys(data.transaction[0]).filter(
              (key) => !['__typename', 'id', 'user'].includes(key),
            ),
            ...Object.keys(data.transaction[0].user).filter((key) => !['__typename'].includes(key)),
          ]}
          options={{
            count: 7000,
            filter: true,
            sort: true,
            serverSide: false,
            search: false,
            pagination: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            rowsPerPage: 10,
            rowsPerPageOptions: [10],
            onChangePage: (currentPageNumber: number) => {
              onPageChange(currentPageNumber, rowNumber);
              setPageNumber(currentPageNumber);
            },
            onChangeRowsPerPage: (currentRowNumber: number) => {
              onPageChange(pageNumber, rowNumber);
              setRowNumber(currentRowNumber);
            },
          }}
        />
      )
    );
  };

  return (
    <>
      <Head>
        <title>Transactions | Avenue Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {user?.permissions.superAdmin ||
          (user?.permissions.orgAdmin as string[]).includes[org.id] ? (
            <Box sx={{ mt: 3 }}>{renderUsers()}</Box>
          ) : (
            <Typography>Not Authorized to view this Page</Typography>
          )}
        </Container>
      </Box>
    </>
  );
};

Transactions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Transactions;
