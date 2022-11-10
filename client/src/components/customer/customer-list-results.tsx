import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Card } from '@mui/material';

import MUIDataTable from 'mui-datatables';

import { UserQuery } from '../../graphql/graphql-types';

interface ICustomerListResults extends React.PropsWithChildren {
  users: UserQuery;
  onPageChange: (pageNumber: number, rowsPerPage: number) => void;
}

export const CustomerListResults: React.FC<ICustomerListResults> = ({
  users: userData,
  onPageChange,
  ...rest
}) => {
  const users = userData.user;
  const [pageNumber, setPageNumber] = useState<number | undefined>(0);
  const [rowNumber, setRowNumber] = useState(10);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, overflowX: 'auto' }}>
          <MUIDataTable
            title={'User List'}
            data={users.map((user, index) => ({
              ...user,
              '#': pageNumber * rowNumber + index + 1,
            }))}
            columns={[
              '#',
              ...Object.keys(users[0]).filter(
                (key) =>
                  !['fests', 'ca', 'id', '__typename', 'selfID', 'dob', 'uid', 'photo'].includes(
                    key,
                  ),
              ),
            ]}
            options={{
              count: 7000,
              filter: true,
              sort: true,
              serverSide: true,
              search: false,
              pagination: true,
              filterType: 'dropdown',
              selectableRows: 'none',
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
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
