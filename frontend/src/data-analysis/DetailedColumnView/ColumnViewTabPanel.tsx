import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import Typography from 'src/shared/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ColumnViewTabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

ColumnViewTabPanel.defaultProps = {
  children: null,
};

export default ColumnViewTabPanel;
