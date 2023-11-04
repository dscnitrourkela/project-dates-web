import React, { useMemo, useState } from 'react';

import { Box, Container, Grid } from '@mui/material';

import Head from 'next/head';

import { DashboardLayout } from '../components/dashboard-layout';
import { ProductCard } from '../components/product/product-card';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { useEventQuery } from '../graphql/graphql-types';
import { useOrgContext } from '../store/contexts/org.context';
import { LocationProvider } from 'store/contexts/location.context';

const Page = () => {
  const { org } = useOrgContext();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
    refetch,
  } = useEventQuery({
    variables: {
      orgId: org?.id,
    },
  });

  const types = useMemo(() => {
    const eventTypes = ['All'];
    eventData?.event.forEach(({ type }) => {
      if (!eventTypes.includes(type)) eventTypes.push(type);
    });
    return eventTypes;
  }, [eventData]);

  const status = useMemo(() => {
    const eventStatus = ['All'];
    eventData?.event.forEach(({ status: currStatus }) => {
      if (!eventStatus.includes(currStatus)) eventStatus.push(currStatus);
    });
    return eventStatus;
  }, [eventData]);

  const filterEvents = (type = '') => {
    setFilteredEvents(
      eventData.event.filter(
        (event) => event.type === type.toUpperCase() || event.status === type.toUpperCase(),
      ),
    );
  };

  const searchEvents = (query: string) => {
    setFilteredEvents(
      eventData.event.filter(({ name, subHeading }) => {
        return (
          name?.toLowerCase().search(query.toLowerCase()) !== -1 ||
          subHeading?.toLowerCase().search(query.toLowerCase()) !== -1
        );
      }),
    );
  };

  if (eventLoading) return <>Loading...</>;
  if (eventError) return <>Error...</>;

  return (
    <>
      <Head>
        <title>Events | Avenue Dashboard</title>
      </Head>
      <LocationProvider>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <ProductListToolbar
              searchEvents={searchEvents}
              filterEvents={filterEvents}
              types={types}
              status={status}
              refetchEvents={refetch}
            />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {(filteredEvents.length ? filteredEvents : eventData.event).map((event) => (
                  <Grid item key={event.id} lg={4} md={6} xs={12}>
                    <ProductCard event={event} refetchEvents={refetch} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </LocationProvider>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
