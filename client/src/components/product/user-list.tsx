import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Card } from '@mui/material';

import MUIDataTable from 'mui-datatables';

import { useEventRegistrationQuery } from '../../graphql/graphql-types';

interface IRegisteredUserList extends React.PropsWithChildren {
  eventId: string;
}

export const RegisteredUserList: React.FC<IRegisteredUserList> = ({ eventId, ...rest }) => {
  const { loading: userLoading, data } = useEventRegistrationQuery({
    variables: {
      eventId: eventId,
    },
  });

  return userLoading ? (
    <div></div>
  ) : (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, overflowX: 'auto' }}>
          <MUIDataTable
            title={'User List'}
            data={data?.eventRegistration.map(({ user }, index) => ({
              ...user,
              '#': index + 1,
            }))}
            columns={[
              '#',
              ...Object.keys(data.eventRegistration[0]?.user || {})?.filter(
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
              pagination: false,
              filterType: 'dropdown',
              selectableRows: 'none',
              rowsPerPage: 10,
              rowsPerPageOptions: [10],
            }}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
