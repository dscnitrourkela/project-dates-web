import React from 'react';

import { styled } from '@mui/material/styles';

export type TColor = 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';

export interface ISeverityPillRoot {
  ownerState: {
    color: TColor;
  };
}

const SeverityPillRoot = styled('span')<ISeverityPillRoot>(({ theme, ownerState }) => {
  const backgroundColor = theme.palette[ownerState.color].main;
  const color = theme.palette[ownerState.color].contrastText;

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };
});

export interface ISeverityPill extends React.PropsWithChildren {
  color: TColor;
}

export const SeverityPill: React.FC<ISeverityPill> = (props) => {
  const { color = 'primary', children, ...other } = props;

  const ownerState = { color };

  return (
    <SeverityPillRoot ownerState={ownerState} {...other}>
      {children}
    </SeverityPillRoot>
  );
};
