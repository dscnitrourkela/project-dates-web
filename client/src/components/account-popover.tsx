/* eslint-disable no-console */
import React, { useContext } from 'react';

import {
  Box,
  MenuItem,
  MenuList,
  Popover,
  PopoverProps,
  Typography
} from '@mui/material';

import Router from 'next/router';
import { AuthContext } from 'store/contexts';

export interface IAccountPopover extends PopoverProps {
  onClose: () => void;
  open: boolean;
}

export const AccountPopover: React.FC<IAccountPopover> = ({
  anchorEl,
  onClose,
  open,
  ...other
}) => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut();

      // Redirect to sign-in page
      Router.push('/login').catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          John Doe
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
