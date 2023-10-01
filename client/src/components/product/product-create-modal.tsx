import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { StatusType, useCreateEventMutation } from '../../graphql/graphql-types';
import { useAuthContext } from '../../store/contexts';
import { useOrgContext } from 'store/contexts/org.context';
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

export interface IProductCreateModal {
  open: boolean;
  handleClose: () => void;
  refetchEvents: () => void;
}

const ProductCreateModal: React.FC<IProductCreateModal> = ({
  open,
  handleClose,
  refetchEvents,
}) => {
  const { user } = useAuthContext();
  const { org } = useOrgContext();

  const [values, setValues] = useState({
    name: '',
    subHeading: '',
    description: [],
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    poster: '',
    prizes: '',
    contact: [],
    type: '',
    status: 'DRAFT',
  });

  const [createEvent, { error, loading }] = useCreateEventMutation();

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

  const handleArrayChange = (index: number, key: string) => (e) =>
    setValues((current) => {
      current[key][index] = e.target.value;

      return {
        ...current,
        [key]: current[key],
      };
    });

  const handleRemove = (index: number, key: string) => {
    setValues((current) => {
      current[key].splice(index, 1);
      return {
        ...current,
        [key]: current[key],
      };
    });
  };

  const handleEventCreate = async () => {
    try {
      await createEvent({
        variables: {
          orgId: org?.id,
          event: {
            name: values.name,
            subHeading: values.subHeading,
            startDate: values.startDate,
            endDate: values.endDate,
            prizeMoney: values.prizes,
            contact: values.contact,
            description: JSON.stringify(
              values.description.map((value, index) => ({
                id: index.toString(),
                desc: value,
              })),
            ),
            poster: values.poster,
            notes: [],
            type: values.type,
            orgID: [org?.id],
            orgType: org?.orgType,
            pocID: [],
            priority: 0,
            weekly: false,
            status: StatusType.Active,
          },
        },
      });

      refetchEvents();
      handleClose();
    } catch (e) {
      toast.error(e);
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
        <>
          <TextField
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
              <IconButton onClick={() => handleRemove(index, 'description')}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          {/* Add another description */}
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
          <DateTimePicker
            label="Start Date"
            value={values.startDate}
            onChange={handleDateTime}
            renderInput={(params) => (
              <TextField
                {...params}
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
            onChange={handleDateTime}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  marginTop: '1rem',
                }}
              />
            )}
          />

          <TextField
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
              <IconButton onClick={() => handleRemove(index, 'contact')}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          {/* Add another contact */}
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

          <TextField
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
          <FormControl fullWidth sx={{ marginTop: '1rem' }} variant="outlined">
            <InputLabel id="demo-simple-select-label" required>
              Type of Event
            </InputLabel>
            <Select
              fullWidth
              label="Type of Event"
              name="type"
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
              value={values.type}
              required
            >
              {Object.entries(EventTypes).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: '1rem' }} variant="outlined">
            <InputLabel id="demo-simple-select-label" required>
              Status of Event
            </InputLabel>
            <Select
              fullWidth
              label="Status of Event"
              name="status"
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
              value={values.status}
              required
            >
              {Object.entries(EventStatus).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            disabled={
              loading ||
              !(
                (user?.permissions.orgEditor as string[])?.includes(org?.id) ||
                (user?.permissions.orgAdmin as string[])?.includes(org?.id) ||
                user?.permissions.superAdmin ||
                user?.permissions.superEditor
              )
            }
            sx={{ marginTop: '1rem' }}
            fullWidth
            variant="contained"
            size="large"
            onClick={handleEventCreate}
          >
            {loading ? <CircularProgress /> : 'Create Event'}
          </Button>
        </>
      </Box>
    </Modal>
  );
};

export default ProductCreateModal;
