/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from '@mui/material';

import { UserQuery, useUpdateUserMutation } from '../../graphql/graphql-types';
import { useOrgContext } from '../../store/contexts/org.context';

const genderOptions = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
  {
    value: 'OTHERS',
    label: 'Others',
  },
];

export interface IAccountProfileDetails {
  user: UserQuery['user']['data'][0];
  disableAll?: boolean;
  checkUserIn?: ({ selfID }: { selfID: string }) => void;
}

const initialState = {
  name: { value: '', disabled: false, full: true },
  email: { value: '', disabled: false, full: false },
  college: { value: '', disabled: false, full: false },
  stream: { value: '', disabled: false, full: false },
  rollNumber: { value: '', disabled: false, full: true },
  city: { value: '', disabled: false, full: false },
  state: { value: '', disabled: false, full: false },
  gender: { value: '', disabled: false, full: false, type: 'select' },
  referredBy: { value: '', disabled: false, full: false },
  selfID: { value: '', disabled: false, full: false },
};

const getNitrStudentDetails = (isNitrStudent, key, user) => {
  const obj = {
    college: 'National Institute of Technology Rourkela',
    city: 'Rourkela',
    state: 'Odisha',
  };
  return isNitrStudent ? obj[key] : user[key];
};

export const AccountProfileDetails: React.FC<IAccountProfileDetails> = ({
  user,
  disableAll,
  checkUserIn,
}) => {
  const { org } = useOrgContext();
  const isNitrStudent = !!user.rollNumber;

  const [buttonDisabled, setDisabled] = useState(true);
  const [values, setValues] = useState(initialState);

  const [updateUser, { loading, error }] = useUpdateUserMutation({
    variables: {
      updateUserId: user.id,
      user: {
        ca: org.festID + '-' + values.selfID.value,
      },
    },
  });

  const handleCheckIn = async () => {
    if (user.ca.find((ca) => ca.includes(org.festID))) {
      toast.error('User already checked in');
      return;
    } else if (!values.selfID.value) {
      toast.error('Please enter a selfID');
      return;
    }

    await updateUser();
    checkUserIn({ selfID: values.selfID.value });
  };

  const handleInputChange = (e, key) => {
    if (key !== 'selfID') {
      setDisabled(false);
    }
    setValues((current) => ({
      ...current,
      [key]: {
        ...current[key],
        value: e.target.value,
      },
    }));
  };

  useEffect(() => {
    setValues({
      name: { value: user.name, disabled: disableAll || false, full: true },

      email: { value: user.email, disabled: disableAll || true, full: false },
      college: {
        value: getNitrStudentDetails(isNitrStudent, 'college', user),
        disabled: disableAll || false,
        full: false,
      },
      stream: { value: user.stream, disabled: disableAll || false, full: false },
      selfID: {
        value:
          user.ca.find((ca) => ca.includes(org.festID))?.substring(org.festID.length + 1) || '',
        disabled: false,
        full: false,
      },

      rollNumber: { value: user.rollNumber, disabled: disableAll || true, full: true },

      city: {
        value: getNitrStudentDetails(isNitrStudent, 'city', user),
        disabled: disableAll || false,
        full: false,
      },
      state: {
        value: getNitrStudentDetails(isNitrStudent, 'state', user),
        disabled: disableAll || false,
        full: false,
      },

      gender: { value: user.gender, disabled: disableAll || false, full: false, type: 'select' },
      referredBy: { value: user.referredBy, disabled: disableAll || true, full: false },
    });
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form autoComplete="off" noValidate>
      <Card>
        {!disableAll && (
          <>
            <CardHeader
              subheader="Some of the information can be updated. Not all information is updatable."
              title="Profile"
            />
            <Divider />
          </>
        )}
        <CardContent>
          <Grid container spacing={3}>
            {Object.keys(values).map((key) => {
              const { full, value, disabled, type } = values[key];

              return (
                <Grid key={key} item md={full ? 12 : 6} xs={12}>
                  {type === 'select' ? (
                    <TextField
                      fullWidth
                      label={`${key[0].toUpperCase()}${key.substring(1)}`}
                      value={value}
                      variant="outlined"
                      onChange={(e) => handleInputChange(e, key)}
                      disabled={disabled}
                      select
                      SelectProps={{ native: true }}
                    >
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      label={`${key[0].toUpperCase()}${key.substring(1)}`}
                      value={value}
                      variant="outlined"
                      onChange={(e) => handleInputChange(e, key)}
                      disabled={disabled}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
        <Divider />

        {!disableAll && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Button
                color={user.ca.find((ca) => ca.includes(org.festID)) ? 'info' : 'primary'}
                variant="contained"
                disabled={loading}
                onClick={handleCheckIn}
                sx={{ mr: '10px', height: '40px', mb: '10px' }}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    {user.ca.find((ca) => ca.includes(org.festID)) ? 'check in done' : 'check in'}
                  </>
                )}
              </Button>

              <Button
                color={user.createdAt < '2022-11-04T06:41:51.070Z' ? 'success' : 'error'}
                variant="contained"
                sx={{ mr: '10px', height: '40px', mb: '10px' }}
              >
                {user.createdAt < '2022-11-04T06:41:51.070Z'
                  ? 'with accomodation'
                  : 'without accomodation'}
              </Button>

              <Button
                color={user.festID.includes(org.festID) || user.rollNumber ? 'success' : 'error'}
                variant="contained"
                sx={{ mr: '10px', height: '40px', mb: '10px' }}
              >
                {user.festID.includes(org.festID) || user.rollNumber
                  ? 'User Registered for '
                  : 'User Not Registered for '}
                {org.name}
              </Button>

              <Button
                sx={{ mr: '10px', height: '40px', mb: '10px' }}
                disabled={buttonDisabled}
                color="primary"
                variant="contained"
              >
                Update details
              </Button>
            </Box>
          </Box>
        )}
      </Card>
    </form>
  );
};
