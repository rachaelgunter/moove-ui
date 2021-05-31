import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExploreIcon from '@material-ui/icons/Explore';
import PageTemplate from 'src/shared/PageTemplate';
import routes from 'src/shared/routes';
import { Role } from 'src/shared/types';
import { UserContext } from 'src/auth/UserProvider';
import { getLinkToReportTool } from 'src/shared/utils';
import Shortcut from './Shortcut';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { organization } = useContext(UserContext);
  const reportsLink = getLinkToReportTool(
    organization,
    process.env.REACT_APP_MRT_ENV,
  );

  const shortcuts = [
    {
      label: 'Map',
      Icon: MapOutlinedIcon,
      onClick: () => history.push(routes.roadIQ.path),
      allowedRoles: Object.values(Role),
    },
    {
      label: 'Analytics',
      Icon: TimelineIcon,
      onClick: () => history.push(routes.dataAnalysis.path),
      allowedRoles: [Role.PAID_USER, Role.ADMIN, Role.SUPER_ADMIN],
    },
    {
      label: 'Reports',
      Icon: ExploreIcon,
      onClick: () => window.location.assign(reportsLink),
      allowedRoles: [Role.SUPER_ADMIN],
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
