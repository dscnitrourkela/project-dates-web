import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Card } from '@mui/material';

import MUIDataTable from 'mui-datatables';

import { UserQuery } from '../../graphql/graphql-types';

// import { getInitials } from '../../utils/get-initials';

interface ICustomerListResults extends React.PropsWithChildren {
  users: UserQuery;
  customers?: unknown;
}

export const CustomerListResults: React.FC<ICustomerListResults> = ({
  users: userData,
  customers,
  ...rest
}) => {
  const users = userData.user;

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, overflowX: 'auto' }}>
          <MUIDataTable
            title={'User List'}
            data={users.map((user, index) => ({ ...user, '#': index }))}
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
              selectableRows: false,
            }}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
