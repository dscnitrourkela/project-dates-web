/* eslint-disable no-console */
import React, { useContext } from 'react';

import { Box, MenuItem, MenuList, Popover, PopoverProps, Typography } from '@mui/material';

import { auth, ENABLE_AUTH } from 'lib/auth';
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
  const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    if (!ENABLE_AUTH) {
      return;
    }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem('skip-auth');

      // Redirect to sign-in page
      Router.push('/sign-in').catch(console.error);
      return;
    }

    try {
      if (!auth) return console.error('auth still undefined');

      // This can be call inside AuthProvider component, but we do it here for simplicity
      await auth.signOut();

      // Update Auth Context state
      authContext.signOut();

      // Redirect to sign-in page
      Router.push('/sign-in').catch(console.error);
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
