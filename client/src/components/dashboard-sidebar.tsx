import React, { useEffect } from 'react';

import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { ChartBar as ChartBarIcon } from 'icons/chart-bar';
// import { Cog as CogIcon } from 'icons/cog';
import { Lock as LockIcon } from 'icons/lock';
import { Selector as SelectorIcon } from 'icons/selector';
import { ShoppingBag as ShoppingBagIcon } from 'icons/shopping-bag';
import { User as UserIcon } from 'icons/user';
// import { UserAdd as UserAddIcon } from 'icons/user-add';
import { Users as UsersIcon } from 'icons/users';
// import { XCircle as XCircleIcon } from 'icons/x-circle';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useAuthContext } from '../store/contexts';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { LocationOnSharp } from '@mui/icons-material';

const items = (permissions) => [
  {
    href: '/dashboard',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard',
    show: true,
  },
  {
    href: '/users',
    icon: <UsersIcon fontSize="small" />,
    title: 'Users',
    show: true,
  },
  {
    href: '/events',
    icon: <ShoppingBagIcon fontSize="small" />,
    title: 'Events',
    show: true,
  },
  {
    href: '/transactions',
    icon: <UserIcon fontSize="small" />,
    title: 'Transactions',
    show: true,
  },
  {
    href: '/permissions',
    icon: <LockIcon fontSize="small" />,
    title: 'Permissions',
    show: permissions?.superAdmin,
  },
  // {
  //   href: '/developer-info',
  //   icon: <UserAddIcon fontSize="small" />,
  //   title: 'Developer Info',
  // },
  {
    href: '/locations',
    icon: <LocationOnSharp fontSize="small" />,
    title: 'Locations',
  },
  // {
  //   href: '/story',
  //   icon: <XCircleIcon fontSize="small" />,
  //   title: 'Story',
  // },
];

export interface IDashboardSidebar {
  open: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<IDashboardSidebar> = (props) => {
  const { user } = useAuthContext();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) return;

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items(user?.permissions).map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%',
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
