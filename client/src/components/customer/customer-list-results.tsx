import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Card } from '@mui/material';

import MUIDataTable from 'mui-datatables';

import { UserQuery } from '../../graphql/graphql-types';

// import { getInitials } from '../../utils/get-initials';

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
  const [pageNumber, setPageNumber] = useState<number | undefined>(1);
  const [rowNumber, setRowNumber] = useState(10);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, overflowX: 'auto' }}>
          <MUIDataTable
            title={'User List'}
            data={users.map((user, index) => ({ ...user, '#': index + 1 }))}
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
              filter: true,
              sort: true,
              search: true,
              filterType: 'dropdown',
              rowsPerPage: rowNumber,
              page: pageNumber,
              serverSide: true,
              selectableRows: 'none',
              onChangePage: (currentPageNumber: number) => {
                console.log(rowNumber, currentPageNumber);
                onPageChange(currentPageNumber, rowNumber);
                setPageNumber(currentPageNumber);
              },
              onChangeRowsPerPage: (currentRowNumber: number) => {
                console.log(currentRowNumber, pageNumber);
                onPageChange(pageNumber, rowNumber);
                setRowNumber(currentRowNumber);
              },
              pagination: true,
            }}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
