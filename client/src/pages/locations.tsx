import { Box, CircularProgress, IconButton } from '@mui/material';
import { DashboardLayout } from 'components/dashboard-layout';
import { Location, useDeleteLocationMutation, useLocationQuery } from 'graphql/graphql-types';
import Head from 'next/head';
import React, { useState } from 'react';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { AddCircle, Edit } from '@mui/icons-material';
import LocationCreateModal from 'components/location/location-create-modal';
import LocationEditModal from 'components/location/location-edit-modal';

const Locations = () => {
  const { data, loading, refetch } = useLocationQuery();
  const [deleteLocation] = useDeleteLocationMutation();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currEditLocation, setCurrEditLocation] = useState<Location | null>(null);

  const handleRowsDelete: MUIDataTableOptions['onRowsDelete'] = ({ data: selectedRows }) => {
    if (confirm('Are you sure you want to delete the selected locations?')) {
      Promise.all(
        selectedRows.map(async ({ dataIndex }) => {
          const locationId = data?.location[dataIndex]?.id;
          if (locationId) {
            await deleteLocation({ variables: { id: locationId } });
          }
        }),
      ).then(() => refetch());
    }

    return false;
  };

  return (
    <>
      <Head>
        <title>Locations | Avenue Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 4,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <MUIDataTable
            title={'Location List'}
            data={data?.location.map((location, index) => ({
              ...location,
              '#': index + 1,
            }))}
            columns={[
              '#',
              ...Object.keys(data?.location[0]).filter(
                (key) => !['__typename', 'id'].includes(key),
              ),
              {
                name: 'Edit',
                label: 'Edit',
                options: {
                  customBodyRenderLite(dataIndex, rowIndex) {
                    return (
                      <IconButton
                        onClick={() => {
                          setCurrEditLocation(data?.location[dataIndex]);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    );
                  },
                },
              },
            ]}
            options={{
              count: 7000,
              filter: true,
              sort: true,
              serverSide: false,
              search: true,
              pagination: true,
              selectableRows: 'multiple',
              filterType: 'dropdown',
              rowsPerPageOptions: [100, 500, 1000],
              customToolbar: () => (
                <IconButton onClick={() => setShowModal(true)}>
                  <AddCircle />
                </IconButton>
              ),
              onRowsDelete: handleRowsDelete,
            }}
          />
        )}
      </Box>

      <LocationCreateModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        refetchLocations={() => refetch()}
      />

      <LocationEditModal
        open={showEditModal}
        location={currEditLocation}
        handleClose={() => setShowEditModal(false)}
        refetchLocations={() => refetch()}
      />
    </>
  );
};

Locations.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Locations;
