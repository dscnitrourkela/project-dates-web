import React, {
  createContext,
  useContext,
  useState
} from 'react';

import { OrgQuery } from '../../graphql/graphql-types';

type Org = OrgQuery['org'][0];

interface OrgContextType {
  org: Org;
  setOrg: (org: Org) => void;
}

export const OrgContext = createContext<OrgContextType | undefined>(undefined);
export const OrgConsumer = OrgContext.Consumer;
export const useOrgContext = (): OrgContextType => {
  const context = useContext(OrgContext);
  if (!context) throw new Error('useOrgContext must be used within a OrgProvider');

  return context;
};

export const OrgProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [org, setOrg] = useState<Org | undefined>();

  return (
    <OrgContext.Provider
      value={{
        org,
        setOrg,
      }}
    >
      {props.children}
    </OrgContext.Provider>
  );
};
