import React, { createContext, useContext, useState } from 'react';

import { LocationQuery } from '../../graphql/graphql-types';

type Locations = LocationQuery['location'];

interface LocationContextType {
  Locations: Locations;
  setLocations: (Locations: Locations) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined);
export const LocationConsumer = LocationContext.Consumer;
export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocationContext must be used within a LocationProvider');

  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [Locations, setLocations] = useState<Locations | undefined>();

  return (
    <LocationContext.Provider
      value={{
        Locations,
        setLocations,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
