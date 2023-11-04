import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

import { Location, useUpdateLocationMutation } from '../../graphql/graphql-types';
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

export interface ILocationEditModal {
  open: boolean;
  location: Location | null;
  handleClose: () => void;
  refetchLocations: () => void;
}

const LocationEditModal: React.FC<ILocationEditModal> = ({
  open,
  location,
  handleClose,
  refetchLocations,
}) => {
  const { user } = useAuthContext();

  const [values, setValues] = useState(
    location || {
      name: '',
      description: '',
      lat: '',
      long: '',
    },
  );

  useEffect(() => {
    setValues(
      location || {
        name: '',
        description: '',
        lat: '',
        long: '',
      },
    );
  }, [location]);

  const [editLocation, { error, loading }] = useUpdateLocationMutation();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationEdit = async () => {
    try {
      await editLocation({
        variables: {
          id: location.id,
          location: {
            name: values.name,
            description: values.description,
            lat: typeof values.lat === 'string' ? parseFloat(values.lat) : values.lat,
            long: typeof values.long === 'string' ? parseFloat(values.long) : values.long,
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
            onClick={handleLocationEdit}
          >
            {loading ? <CircularProgress /> : 'Edit Location'}
          </Button>
        </>
      </Box>
    </Modal>
  );
};

export default LocationEditModal;
