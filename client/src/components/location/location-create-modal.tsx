import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

import { useCreateLocationMutation } from '../../graphql/graphql-types';
import { useAuthContext } from '../../store/contexts';

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

export interface ILocationCreateModal {
  open: boolean;
  handleClose: () => void;
  refetchLocations: () => void;
}

const LocationCreateModal: React.FC<ILocationCreateModal> = ({
  open,
  handleClose,
  refetchLocations,
}) => {
  const { user } = useAuthContext();

  const [values, setValues] = useState({
    name: '',
    description: '',
    lat: '',
    long: '',
  });

  const [createLocation, { error, loading }] = useCreateLocationMutation();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationCreate = async () => {
    try {
      await createLocation({
        variables: {
          location: {
            ...values,
            lat: values.lat ? parseFloat(values.lat) : 0,
            long: values.long ? parseFloat(values.long) : 0,
          },
        },
      });

      refetchLocations();
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
            label="Location Name"
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
            label="Description"
            name="description"
            onChange={handleChange}
            required
            value={values.description}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />

          <TextField
            fullWidth
            label="Latitude"
            name="lat"
            onChange={handleChange}
            required
            value={values.lat}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />

          <TextField
            fullWidth
            label="Longitude"
            name="long"
            onChange={handleChange}
            required
            value={values.long}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />

          <Button
            disabled={loading || !(user?.permissions.superAdmin || user?.permissions.superEditor)}
            sx={{ marginTop: '1rem' }}
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLocationCreate}
          >
            {loading ? <CircularProgress /> : 'Create Location'}
          </Button>
        </>
      </Box>
    </Modal>
  );
};

export default LocationCreateModal;
