import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {
  EventQuery,
  EventRegistrationQuery,
  useUpdateEventMutation,
} from '../../graphql/graphql-types';
import { useAuthContext } from '../../store/contexts';
import UserSearch from './user-search';
import { EventStatus, EventTypes } from './constants';
import { Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '7px',
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
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

  const {
    name,
    subHeading,
    description,
    startDate,
    endDate,
    prizeMoney,
    contact,
    poster,
    type,
    status,
  } = event;
  const [values, setValues] = useState({
    name,
    subHeading,
    description: JSON.parse(description).map(
      (value: { desc: string; id: number }) => value.desc,
    ) as string[],
    startDate,
    endDate,
    prizes: prizeMoney,
    contact,
    poster,
    type,
    status,
  });

  const [updateEvent, { error, loading }] = useUpdateEventMutation();

  const handleDateTime = (e, key) => {
    setValues((current) => ({
      ...current,
      [key]: e.toISOString(),
    }));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemove = (index: number, key: string) => {
    setValues((current) => {
      current[key].splice(index, 1);
      return {
        ...current,
        [key]: current[key],
      };
    });
  };

  const handleArrayChange = (index: number, key: string) => (e) =>
    setValues((current) => {
      current[key][index] = e.target.value;

      return {
        ...current,
        [key]: current[key],
      };
    });

  const handleEventUpdate = async () => {
    try {
      await updateEvent({
        variables: {
          updateEventId: event.id,
          orgId: event.orgID[0],
          event: {
            name: values.name,
            subHeading: values.subHeading,
            startDate: values.startDate,
            endDate: values.endDate,
            type: values.type,
            status: values.status,
            prizeMoney: values.prizes,
            contact: values.contact,
            description: JSON.stringify(
              values.description.map((value, index) => ({
                id: index.toString(),
                desc: value,
              })),
            ),
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
              name="name"
              onChange={handleChange}
              required
              value={values.name}
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
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                <TextareaAutosize
                  disabled={stage === STAGES.VIEW}
                  key={index}
                  placeholder="Description"
                  value={value}
                  required
                  onChange={handleArrayChange(index, 'description')}
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
                {stage === STAGES.EDIT && (
                  <IconButton onClick={() => handleRemove(index, 'description')}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
            {/* Add another description */}
            {stage === STAGES.EDIT && (
              <Button
                disabled={loading}
                sx={{ marginTop: '1rem' }}
                fullWidth
                variant="contained"
                size="large"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    description: [...current.description, ''],
                  }))
                }
              >
                Add Description
              </Button>
            )}
            <DateTimePicker
              label="Start Date"
              value={values.startDate}
              onChange={(e) => handleDateTime(e, 'startDate')}
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
            <DateTimePicker
              label="End Date"
              value={values.endDate}
              onChange={(e) => handleDateTime(e, 'endDate')}
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
            {values.contact.map((value, index) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  onChange={handleArrayChange(index, 'contact')}
                  required
                  value={value}
                  variant="outlined"
                  sx={{
                    marginTop: '1rem',
                  }}
                />
                {stage === STAGES.EDIT && (
                  <IconButton onClick={() => handleRemove(index, 'contact')}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
            {/* Add another contact */}
            {stage === STAGES.EDIT && (
              <Button
                disabled={loading}
                sx={{ marginTop: '1rem' }}
                fullWidth
                variant="contained"
                size="large"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    contact: [...current.contact, ''],
                  }))
                }
              >
                Add Contact
              </Button>
            )}

            <TextField
              disabled={stage === STAGES.VIEW}
              fullWidth
              label="Prize Money"
              name="prizes"
              onChange={handleChange}
              required
              value={values.prizes}
              variant="outlined"
              sx={{
                marginTop: '1rem',
              }}
            />
            <FormControl
              disabled={stage === STAGES.VIEW}
              fullWidth
              sx={{ marginTop: '1rem' }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label" required>
                Type of Event
              </InputLabel>
              <Select
                disabled={stage === STAGES.VIEW}
                fullWidth
                label="Type of Event"
                name="type"
                onChange={handleChange}
                sx={{
                  width: '100%',
                }}
                value={values.type}
                required={stage === STAGES.EDIT}
              >
                {Object.entries(EventTypes).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              disabled={stage === STAGES.VIEW}
              fullWidth
              sx={{ marginTop: '1rem' }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label" required>
                Status of Event
              </InputLabel>
              <Select
                disabled={stage === STAGES.VIEW}
                fullWidth
                label="Status of Event"
                name="status"
                onChange={handleChange}
                sx={{
                  width: '100%',
                }}
                value={values.status}
                required={stage === STAGES.EDIT}
              >
                {Object.entries(EventStatus).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
          {(user?.permissions?.superAdmin ||
            user?.permissions?.superEditor ||
            (user?.permissions?.orgAdmin as string[]).includes(event.orgID[0]) ||
            (user?.permissions?.orgEditor as string[]).includes(event.orgID[0])) && (
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
