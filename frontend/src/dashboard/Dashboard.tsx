import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

import PageTemplate from 'src/shared/PageTemplate';
import Shortcut from './Shortcut';

const Dashboard: React.FC = () => {
  const shortcuts = [
    {
      label: 'RoadIQ',
      Icon: MapOutlinedIcon,
      // TODO use history instead
      onClick: () => window.open('https://moove-prod-ui.moove.ai/', '_blank'),
    },
  ];

  return (
    <PageTemplate title="Dashboard">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="subtitle1">Shortcuts</Typography>
        </Grid>
        <Grid item container spacing={4}>
          {shortcuts.map((shortcutProps) => (
            <Grid item key={shortcutProps.label}>
              <Shortcut {...shortcutProps} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default Dashboard;
