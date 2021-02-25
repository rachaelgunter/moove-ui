import React from 'react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';

import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

import PageTemplate from 'src/shared/PageTemplate';
import Shortcut from './Shortcut';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

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
          <Typography className={classes.title} variant="body1">
            Shortcuts
          </Typography>
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
