import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import PageTemplate from 'src/shared/PageTemplate';
import routes from 'src/shared/routes';
import Shortcut from './Shortcut';

const Dashboard: React.FC = () => {
  const history = useHistory();

  const shortcuts = [
    {
      label: 'RoadIQ',
      Icon: MapOutlinedIcon,
      onClick: () => history.push(routes.roadIQ.path),
    },
    {
      label: 'Analytics',
      Icon: TimelineIcon,
      onClick: () => history.push(routes.dataAnalysis.path),
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
