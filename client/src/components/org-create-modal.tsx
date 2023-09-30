import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useAuthContext } from 'store/contexts';
import { OrgSubType, OrgType, StatusType, useCreateOrgMutation } from 'graphql/graphql-types';

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

export interface IOrgCreateModal {
  open: boolean;
  handleClose: () => void;
  refetchOrgs: () => void;
}

const OrgCreateModal: React.FC<IOrgCreateModal> = ({ open, handleClose, refetchOrgs }) => {
  const { user } = useAuthContext();

  const [values, setValues] = useState({
    name: '',
    orgType: OrgType.Fest,
    description: '',
    logo: '',
    orgSubType: OrgSubType.Technical,
    status: StatusType.Draft,
    coverImg: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    registrationFee: '',
    festID: '',
    tagline: '',
  });

  const [createOrg, { error, loading }] = useCreateOrgMutation();

  const handleDateTime = (key: string) => (e) => {
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

  const handleOrgCreate = async () => {
    try {
      await createOrg({
        variables: {
          org: {
            name: values.name,
            orgType: values.orgType,
            description: values.description,
            logo: values.logo,
            orgSubType: values.orgSubType,
            status: values.status,
            coverImg: values.coverImg,
            startDate: values.startDate,
            endDate: values.endDate,
            registrationFee: parseInt(values.registrationFee),
            festID: values.festID,
            tagline: values.tagline,
          },
        },
      });

      refetchOrgs();
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
            label="Organisation Name"
            name="name"
            onChange={handleChange}
            required
            value={values.name}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />
          <FormControl fullWidth sx={{ marginTop: '1rem' }} variant="outlined">
            <InputLabel id="demo-simple-select-label" required>
              Organisation Type
            </InputLabel>
            <Select
              fullWidth
              label="Organisation Type"
              name="orgType"
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
              value={values.orgType}
              required
            >
              {Object.entries(OrgType).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextareaAutosize
            placeholder="Description"
            value={values.description}
            required
            onChange={handleChange}
            name="description"
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
          <TextField
            fullWidth
            label="Logo URL"
            name="logo"
            onChange={handleChange}
            required
            value={values.logo}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />
          <FormControl fullWidth sx={{ marginTop: '1rem' }} variant="outlined">
            <InputLabel id="demo-simple-select-label" required>
              Organisation Sub-Type
            </InputLabel>
            <Select
              fullWidth
              label="Organisation Sub-Type"
              name="orgSubType"
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
              value={values.orgSubType}
              required
            >
              {Object.entries(OrgSubType).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: '1rem' }} variant="outlined">
            <InputLabel id="demo-simple-select-label" required>
              Organisation Status
            </InputLabel>
            <Select
              fullWidth
              label="Organisation Status"
              name="status"
              onChange={handleChange}
              sx={{
                width: '100%',
              }}
              value={values.status}
              required
            >
              {Object.entries(StatusType).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Cover Image URL"
            name="coverImg"
            onChange={handleChange}
            value={values.coverImg}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />
          <DateTimePicker
            label="Start Date"
            value={values.startDate}
            onChange={handleDateTime('startDate')}
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
            onChange={handleDateTime('endDate')}
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
            label="Registration Fee"
            name="registrationFee"
            onChange={handleChange}
            required
            value={values.registrationFee}
            variant="outlined"
            InputProps={{
              inputMode: 'numeric',
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: {
                style: {
                  textAlign: 'right',
                },
              },
              value: values.registrationFee
                ? parseFloat(values.registrationFee).toLocaleString()
                : '',
            }}
            sx={{
              marginTop: '1rem',
            }}
          />
          <TextField
            fullWidth
            label="Fest ID"
            name="festID"
            onChange={handleChange}
            value={values.festID}
            variant="outlined"
            sx={{
              marginTop: '1rem',
            }}
          />
          <TextareaAutosize
            placeholder="Tagline"
            value={values.tagline}
            required
            onChange={handleChange}
            name="tagline"
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

          <Button
            disabled={
              loading ||
              !(
                user?.permissions.orgAdmin ||
                user?.permissions.superAdmin ||
                user?.permissions.superEditor
              )
            }
            sx={{ marginTop: '1rem' }}
            fullWidth
            variant="contained"
            size="large"
            onClick={handleOrgCreate}
          >
            {loading ? <CircularProgress /> : 'Create Organisation'}
          </Button>
        </>
      </Box>
    </Modal>
  );
};

export default OrgCreateModal;
