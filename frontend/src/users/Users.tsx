import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import CreateButton from 'src/shared/CreateButton';

import PageTemplate from 'src/shared/PageTemplate';
import InviteUserDialog from './InviteUserDialog/InviteUserDialog';
import UsersTable from './UsersTable';

const useStyles = makeStyles((theme: Theme) => ({
  pageHeader: {
    paddingBottom: theme.spacing(2),
  },
}));

const Users: React.FC = () => {
  const [isInvitationDialogOpened, setInvitationDialogOpened] = useState(false);
  const classes = useStyles();

  return (
    <>
      <PageTemplate title="User Management">
        <Grid
          className={classes.pageHeader}
          item
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1">Users</Typography>
          </Grid>
          <Grid item>
            <CreateButton onClick={() => setInvitationDialogOpened(true)}>
              Invite User
            </CreateButton>
          </Grid>
        </Grid>
        <UsersTable />
      </PageTemplate>
      <InviteUserDialog
        open={isInvitationDialogOpened}
        onClose={() => setInvitationDialogOpened(false)}
        onComplete={() => setInvitationDialogOpened(false)}
      />
    </>
  );
};

export default Users;
