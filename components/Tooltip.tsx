import React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function GenericTooltip({ children, title }: { children: React.ReactElement, title: string }) {
  return (
    <Tooltip title={title}>
        {children}
    </Tooltip>
  );
}
