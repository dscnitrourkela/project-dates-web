import React, { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import { UserQuery } from '../../graphql/graphql-types';

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
  user: UserQuery['user'][0];
}

const getNitrStudentDetails = (isNitrStudent, key, user) => {
  const obj = {
    college: 'National Institute of Technology Rourkela',
    city: 'Rourkela',
    state: 'Odisha',
  };
  return isNitrStudent ? obj[key] : user[key];
};

export const AccountProfileDetails = ({ user }) => {
  const isNitrStudent = !!user.rollNumber;
  const [buttonDisabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    name: { value: user.name, disabled: false, full: true },

    email: { value: user.email, disabled: true, full: false },
    mobile: { value: user.mobile, disabled: true, full: false },

    college: {
      value: getNitrStudentDetails(isNitrStudent, 'college', user),
      disabled: false,
      full: false,
    },
    stream: { value: user.stream, disabled: false, full: false },

    rollNumber: { value: user.rollNumber, disabled: true, full: true },

    city: {
      value: getNitrStudentDetails(isNitrStudent, 'city', user),
      disabled: false,
      full: false,
    },
    state: {
      value: getNitrStudentDetails(isNitrStudent, 'state', user),
      disabled: false,
      full: false,
    },

    gender: { value: user.gender, disabled: false, full: false, type: 'select' },
    referredBy: { value: user.referredBy, disabled: true, full: false },
  });

  const handleInputChange = (e, key) => {
    setDisabled(false);
    setValues((current) => ({
      ...current,
      [key]: {
        ...current[key],
        value: e.target.value,
      },
    }));
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="Some of the information can be updated. Not all information is updatable."
          title="Profile"
        />
        <Divider />
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button disabled={buttonDisabled} color="primary" variant="contained">
            Update details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
