import React, { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { format } from 'date-fns';

import { EventQuery, StatusType, useUpdateEventMutation } from '../../graphql/graphql-types';
import { Clock as ClockIcon } from '../../icons/clock';
import { Users as UsersIcon } from '../../icons/users';
import ProductEditModal from './product-edit-modal';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useOrgContext } from 'store/contexts/org.context';

export interface IProductCard extends CardProps {
  event: EventQuery['event'][0];
  refetchEvents: () => void;
}

export const ProductCard: React.FC<IProductCard> = ({ event, refetchEvents, ...rest }) => {
  const [openModal, setOpenModal] = useState(false);
  const { org } = useOrgContext();

  const [updateEvent] = useUpdateEventMutation();

  const handleDelete = async () => {
    try {
      await updateEvent({
        variables: {
          updateEventId: event?.id,
          orgId: org?.id,
          event: {
            status: StatusType.Expired,
          },
        },
      });
      refetchEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
        }}
        {...rest}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
          }}
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
        <CardContent sx={{ padding: '0 !important' }} onClick={() => setOpenModal(true)}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3,
            }}
          >
            <img
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt="event image"
              src={
                event.poster ||
                'https://res.cloudinary.com/riteshp2000/image/upload/v1667765765/coming-soon_waxnyz.png'
              }
            />
          </Box>
          <Typography align="center" color="textPrimary" gutterBottom variant="h5">
            {event.name}
          </Typography>
        </CardContent>

        <CardContent sx={{ paddingTop: '0px !important' }}>
          <Typography align="center" color="textPrimary" variant="body1">
            {`${JSON.parse(event.description)[0]?.desc}` === 'undefined'
              ? ''
              : `${JSON.parse(event.description)[0]?.desc}`.substring(0, 50)}
            ...
          </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <ClockIcon color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {format(new Date(event.startDate), 'do MMM, hh:mm aaa')}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <UsersIcon color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                Registrations: {event.eventRegistrationCount}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <ProductEditModal
        refetchEvents={refetchEvents}
        event={event}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
