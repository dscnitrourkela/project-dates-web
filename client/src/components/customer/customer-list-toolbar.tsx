import React from 'react';

import {
  Box,
  BoxProps,
  Button,
  Typography
} from '@mui/material';

export interface ICustomerListToolbar extends BoxProps {
  setShowNitrStudents: (param: boolean) => void;
  showNitrStudents: boolean;
}

export const CustomerListToolbar: React.FC<ICustomerListToolbar> = ({
  setShowNitrStudents,
  showNitrStudents,
  ...rest
}) => (
  <Box {...rest}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Registered Users for Innovision 2022
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          disabled={showNitrStudents}
          onClick={() => setShowNitrStudents(true)}
          sx={{ mr: 1 }}
        >
          Show NITR Students
        </Button>
        <Button
          disabled={!showNitrStudents}
          onClick={() => setShowNitrStudents(false)}
          sx={{ mr: 1 }}
        >
          Show Non NITR Students
        </Button>
        {/* <Button color="primary" variant="contained">
          Add Customers
        </Button> */}
      </Box>
    </Box>
  </Box>
);
