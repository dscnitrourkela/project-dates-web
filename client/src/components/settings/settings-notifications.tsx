import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';

import { UserQuery } from '../../graphql/graphql-types';
import { avenueApi } from '../../lib/api';
import { useAuthContext } from '../../store/contexts';

export interface ISettingsNotifications {
  searchedUser: UserQuery['user'][0];
}

export const SettingsNotifications: React.FC<ISettingsNotifications> = ({ searchedUser }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    superAdmin: false,
    superEditor: false,
    superViewer: false,
    orgAdmin: false,
    orgEditor: false,
    orgViewer: false,
  });

  const handleCheckboxChange = (key) => {
    setValues((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const { data } = await avenueApi.post('/auth', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: {
          uid: searchedUser.uid,
          superAdmin: values.superAdmin,
          superEditor: values.superEditor,
          superViewer: values.superViewer,
          orgAdmin: [],
          orgEditor: [],
          orgViewer: [],
        },
      });

      if (data) toast.success('Successfully updated permission');
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <Card sx={{ mb: '1rem' }}>
      <CardHeader
        subheader="List of Permissions that can be assigned to the searched user"
        title="Permissions"
      />
      <Divider />

      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Super Permissions
            </Typography>
            <FormControlLabel
              label="Super Admin"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('superAdmin')}
                  color="primary"
                  value={values.superAdmin}
                />
              }
            />
            <FormControlLabel
              label="Super Editor"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('superEditor')}
                  color="primary"
                  value={values.superEditor}
                />
              }
            />
            <FormControlLabel
              label="Super Viewer"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('superViewer')}
                  color="primary"
                  value={values.superViewer}
                />
              }
            />
          </Grid>

          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Organization Permissions
            </Typography>
            <FormControlLabel
              label="Org Admin"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('orgAdmin')}
                  color="primary"
                  value={values.orgAdmin}
                />
              }
            />
            <FormControlLabel
              label="Org Editor"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('orgEditor')}
                  color="primary"
                  value={values.orgEditor}
                />
              }
            />
            <FormControlLabel
              label="Org Viewer"
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('orgViewer')}
                  color="primary"
                  value={values.orgViewer}
                />
              }
            />
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button disabled={loading} onClick={handleSaveClick} color="primary" variant="contained">
          Save
        </Button>
      </Box>
    </Card>
  );
};
