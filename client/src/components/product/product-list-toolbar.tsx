import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardContent, SvgIcon, TextField, Typography } from '@mui/material';
import { BoxProps } from '@mui/system/Box';

import { Search as SearchIcon } from 'icons/search';
import { Upload as UploadIcon } from 'icons/upload';
import ProductCreateModal from './product-create-modal';
import { useAuthContext } from 'store/contexts';
import { useOrgContext } from 'store/contexts/org.context';
import { toast } from 'react-toastify';
import { useLocationContext } from 'store/contexts/location.context';
import { useLocationQuery } from 'graphql/graphql-types';

export interface IProductListToolbar extends BoxProps {
  filterEvents: (param: string) => void;
  searchEvents: (param: string) => void;
  types: string[];
  refetchEvents: () => void;
  status: string[];
}

export const ProductListToolbar: React.FC<IProductListToolbar> = ({
  filterEvents,
  searchEvents,
  types,
  refetchEvents,
  status,
  ...rest
}) => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthContext();
  const { org } = useOrgContext();
  const { setLocations } = useLocationContext();
  const { data: locationData } = useLocationQuery();

  useEffect(() => {
    setLocations(locationData?.location);
  }, [locationData, setLocations]);

  const handleOpenModal = () => {
    if (
      user?.permissions?.superAdmin ||
      user?.permissions?.superEditor ||
      (user?.permissions?.orgAdmin as string[]).includes(org?.id) ||
      (user?.permissions?.orgEditor as string[]).includes(org?.id)
    )
      setOpenModal(true);
    else toast.error('You do not have permissions to add events');
  };

  return (
    <>
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
            Events
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                  placeholder="Search Event Name"
                  variant="outlined"
                  sx={{ marginRight: '0.5rem', width: '60%' }}
                />
                <Button
                  onClick={() => searchEvents(search)}
                  variant="contained"
                  sx={{ marginRight: '0.5rem', width: '19%' }}
                  startIcon={
                    // @ts-ignore
                    <SvgIcon fontSize="small" color="white">
                      <SearchIcon />
                    </SvgIcon>
                  }
                >
                  Search
                </Button>

                <Button
                  variant="contained"
                  onClick={handleOpenModal}
                  sx={{ width: '19%' }}
                  startIcon={
                    // @ts-ignore
                    <SvgIcon fontSize="small" color="white">
                      <UploadIcon />
                    </SvgIcon>
                  }
                >
                  Add Event
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
                {types.map((text) => (
                  <Button
                    key={text}
                    onClick={() => filterEvents(text === 'All' ? '' : text)}
                    variant="outlined"
                    sx={{ marginRight: '0.5rem' }}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
                {status.map((text) => (
                  <Button
                    key={text}
                    onClick={() => filterEvents(text === 'All' ? '' : text)}
                    variant="outlined"
                    sx={{ marginRight: '0.5rem' }}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ProductCreateModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        refetchEvents={refetchEvents}
      />
    </>
  );
};
