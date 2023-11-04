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

        const newData = fetchMoreResult.transaction.data;
        const totalCount = fetchMoreResult.transaction.count;
        const uniqueMap = new Map();
        prev.transaction.data.forEach((item) => {
          uniqueMap.set(item.transactionID, item);
        });

        // Add new items from fetchMoreResult, avoiding duplicates
        newData.forEach((item) => {
          if (!uniqueMap.has(item.transactionID)) {
            uniqueMap.set(item.transactionID, item);
          }
        });

        const uniqueData = Array.from(uniqueMap.values());

        return Object.assign({}, prev, {
          transaction: {
            ...prev.transaction,
            data: uniqueData,
            count: totalCount,
          },
        });
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
          data={data.transaction.data.map((transaction, index) => ({
            ...transaction,
            ...transaction.user,
            '#': index + 1,
            ca: transaction.user.ca.find((ca) => ca.includes(org.festID)) || 'Not checked in',
          }))}
          columns={[
            '#',
            ...Object.keys(data.transaction.data[0]).filter(
              (key) => !['__typename', 'id', 'user'].includes(key),
            ),
            ...Object.keys(data.transaction.data[0].user).filter(
              (key) => !['__typename'].includes(key),
            ),
          ]}
          options={{
            count: data.transaction.count || 0,
            filter: true,
            sort: true,
            serverSide: false,
            search: false,
            pagination: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            rowsPerPage: rowNumber,
            rowsPerPageOptions: [10, 50, 500, 1000],
            onChangePage: (currentPageNumber: number) => {
              onPageChange(currentPageNumber, rowNumber);
              setPageNumber(currentPageNumber);
            },
            onChangeRowsPerPage: (currentRowNumber: number) => {
              onPageChange(pageNumber, currentRowNumber);
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
          (user?.permissions.orgAdmin as string[]).includes(org.id) ? (
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
