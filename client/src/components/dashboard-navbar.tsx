import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, AppBarProps, Avatar, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';

import { UserCircle as UserCircleIcon } from 'icons/user-circle';

import { OrgQuery, useOrgLazyQuery } from '../graphql/graphql-types';
import { useAuthContext } from '../store/contexts';
import { useOrgContext } from '../store/contexts/org.context';
import { AccountPopover } from './account-popover';

const DashboardNavbarRoot = styled(AppBar)<{ theme?: Theme }>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export interface IDashboardNavbar extends AppBarProps {
  onSidebarOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export const DashboardNavbar: React.FC<IDashboardNavbar> = ({ onSidebarOpen, ...other }) => {
  const settingsRef = useRef(null);

  const { user } = useAuthContext();
  const { org, setOrg } = useOrgContext();

  const [orgs, setOrgs] = useState<OrgQuery['org'] | undefined>();
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  const [getOrgs] = useOrgLazyQuery();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOrg = orgs.filter(({ name }) => event.target.value === name);
    setOrg(selectedOrg[0]);
  };

  // @ts-ignore
  useEffect(() => {
    (async () => {
      if (user?.permissions) {
        if (user?.permissions.superAdmin) {
          const { data } = await getOrgs();
          setOrgs(data.org);
          setOrg(data.org[0]);
          return;
        }

        const userOrgs = [];
        [
          user?.permissions.orgAdmin,
          user?.permissions.orgEditor,
          user?.permissions.orgViewer,
        ].forEach((orgList) => {
          // @ts-ignore
          orgList.forEach((id) => userOrgs.push(id));
        });

        const orgList = await Promise.all(
          userOrgs.map((id) => getOrgs({ variables: { orgID: id } })),
        );
        setOrgs(orgList.map(({ data }) => data.org[0]));
        setOrg(orgList[0]?.data.org[0]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.permissions]);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          paddingTop: '0.7rem',
          paddingBottom: '0.7rem',
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Select An Organisation" placement="left">
            <FormControl sx={{ width: 'auto', minWidth: '10rem', marginRight: '1rem' }}>
              <InputLabel id="demo-simple-select-label">Organisation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={org?.name || ''}
                label="Organisation"
                onChange={handleChange}
              >
                {orgs?.map((o) => (
                  <MenuItem key={o.id} value={o.name}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Tooltip>

          {user && (
            <Avatar
              onClick={() => setOpenAccountPopover(true)}
              ref={settingsRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
                ml: 1,
              }}
              src={user?.firebase.photoURL}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
        name={user?.firebase.displayName}
      />
    </>
  );
};
