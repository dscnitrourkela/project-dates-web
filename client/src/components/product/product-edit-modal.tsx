import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Tab, Tabs, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import MUIDataTable from 'mui-datatables';

import {
  EventQuery,
  EventRegistrationQuery,
  useUpdateEventMutation
} from '../../graphql/graphql-types';
import { useAuthContext } from '../../store/contexts';
import UserSearch from './user-search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '7px',
  p: 4,
  height: 'auto',
};

const STAGES = {
  EDIT: 'Edit Event',
  REGISTERED: 'Registered Users',
  VIEW: 'View Event',
};

export interface IProductEditModal {
  open: boolean;
  handleClose: () => void;
  event: EventQuery['event'][0];
  refetchEvents: () => void;
  eventRegistration?: EventRegistrationQuery['eventRegistration'];
}

const ProductEditModal: React.FC<IProductEditModal> = ({
  open,
  handleClose,
  event,
  refetchEvents,
}) => {
  const [stage, setStage] = useState(STAGES.VIEW);
  const { user } = useAuthContext();

  const name = JSON.parse(event.name);
  const [values, setValues] = useState({
    heading: name.heading,
    subHeading: name.subHeading,
    description: JSON.parse(event.description),
    date: event.startDate,
    prizes: name.prize,
    contact: '',
    poster: event.poster,
  });

  const [updateEvent, { error, loading }] = useUpdateEventMutation();

  const handleDateTime = (e) => {
    setValues((current) => ({
      ...current,
      date: e.toISOString(),
    }));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescChange = (index) => (e) =>
    setValues((current) => {
      const { description } = current;
      description[index].desc = e.target.value;

      return {
        ...current,
        description,
      };
    });

  const handleEventUpdate = async () => {
    try {
      await updateEvent({
        variables: {
          updateEventId: event.id,
          orgId: event.orgID[0],
          event: {
            name: JSON.stringify({
              heading: values.heading,
              subHeading: values.subHeading,
              prize: values.prizes,
              contact: values.contact,
            }),
            description: JSON.stringify(values.description),
            poster: values.poster,
          },
        },
      });

      refetchEvents();
      handleClose();
    } catch (e) {
      toast.error(e);
    }
  };

  const renderStages = () => {
    switch (stage) {
      case STAGES.REGISTERED:
        return <UserSearch eventId={event.id} />;

      case STAGES.VIEW:
      case STAGES.EDIT:
      default:
        return (
          <>
            <TextField
              disabled={stage === STAGES.VIEW}
              fullWidth
              label="Event Name"
              name="heading"
              onChange={handleChange}
              required
              value={values.heading}
              variant="outlined"
              sx={{
                marginTop: '1rem',
              }}
            />
            <TextField
              disabled={stage === STAGES.VIEW}
              fullWidth
              label="Club Name"
              name="subHeading"
              onChange={handleChange}
              required
              value={values.subHeading}
              variant="outlined"
              sx={{
                marginTop: '1rem',
              }}
            />
            {values.description.map((value, index) => (
              <TextareaAutosize
                disabled={stage === STAGES.VIEW}
                key={index}
                placeholder="Description"
                value={value.desc}
                required
                onChange={handleDescChange(index)}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  padding: '14px',
                  fontSize: '16px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '7px',
                  fontFamily: 'Inter',
                }}
              />
            ))}
            <DateTimePicker
              label="Start Date"
              value={values.date}
              onChange={handleDateTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={stage === STAGES.VIEW}
                  sx={{
                    width: '100%',
                    marginTop: '1rem',
                  }}
                />
              )}
            />
            <TextField
              disabled={stage === STAGES.VIEW}
              fullWidth
              label="Poster URL"
              name="poster"
              onChange={handleChange}
              required
              value={values.poster}
              variant="outlined"
              sx={{
                marginTop: '1rem',
              }}
            />
            <TextField
              disabled={stage === STAGES.VIEW}
              fullWidth
              label="Contact"
              name="contact"
              onChange={handleChange}
              value={values.contact}
              variant="outlined"
              sx={{
                marginTop: '1rem',
              }}
            />

            {stage === STAGES.EDIT && (
              <Button
                disabled={loading}
                sx={{ marginTop: '1rem' }}
                fullWidth
                variant="contained"
                size="large"
                onClick={handleEventUpdate}
              >
                {loading ? <CircularProgress /> : 'Update Event'}
              </Button>
            )}
          </>
        );
    }
  };

  if (error) toast.error(error.message);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Tabs
          value={stage}
          onChange={(e, newStage) => setStage(newStage)}
          sx={{ marginBottom: '1rem' }}
        >
          <Tab value={STAGES.VIEW} label="View Details" />
          {(user.permissions?.superAdmin || user.permissions?.superEditor) && (
            <Tab value={STAGES.EDIT} label="Edit Event" />
          )}
          <Tab value={STAGES.REGISTERED} label="Registered User Details" />
        </Tabs>
        {renderStages()}
      </Box>
    </Modal>
  );
};

export default ProductEditModal;
