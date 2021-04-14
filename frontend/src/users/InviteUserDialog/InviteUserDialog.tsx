import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { User } from 'src/auth/UserProvider';
import CreateDatasetMessage from 'src/data-analysis/CreateDatasetDialog/CreateDatasetMessage';
import { haveAccess } from 'src/shared/authorization/utils';
import DialogWrapper from 'src/shared/DialogWrapper';
import TextField from 'src/shared/TextField';
import { Role } from 'src/shared/types';
import { isValidEmail } from 'src/shared/utils';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from 'src/assets/images/warning.svg';
import CREATE_USER_MUTATION from '../mutations';
import { ORGANIZATIONS_QUERY } from '../queries';
import { Organization } from '../types';

interface InviteUserDialogProps {
  open: boolean;
  userData: User;
  onClose: () => void;
  onComplete: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  selector: {
    border: 'solid 1px',
    borderColor: '#fff',
    borderRadius: theme.spacing(4),
    marginTop: theme.spacing(1),
    fontSize: '14px',

    '& .MuiSelect-iconOutlined': {
      color: '#fff',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
  },
  hint: {
    margin: '24px 0',
  },
  dialogButton: {
    '&:disabled': {
      color: theme.palette.action.disabled,
    },
  },
}));

const InviteUserDialog: FC<InviteUserDialogProps> = ({
  open,
  onClose,
  onComplete,
  userData,
}: InviteUserDialogProps) => {
  const classes = useStyles();
  const { roles, organizationObject: userOrganization } = userData;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(Role.PAID_USER);
  const [organizationId, setOrganizationId] = useState<number>(
    userOrganization.id,
  );
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState('');

  const { data: organizationsData } = useQuery<{
    organizations: Organization[];
  }>(ORGANIZATIONS_QUERY);
  const [createUser, { loading: creationLoading }] = useMutation(
    CREATE_USER_MUTATION,
    {
      refetchQueries: ['users'],
      onCompleted: () => setCompleted(true),
      onError: () => setError(true),
    },
  );

  const onEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (!isValidEmail(newEmail)) {
      setEmailError('Invalid email');
      return;
    }
    setEmailError('');
  };

  const onRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as Role);
  };

  const onOrganizationChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setOrganizationId(event.target.value as number);
  };

  const isInviteButtonDisabled = () => {
    return (
      !name.length || !email.length || !!emailError.length || creationLoading
    );
  };

  const handleUserCreation = () => {
    createUser({
      variables: {
        createUserPayload: {
          name,
          email,
          role,
          organizationId,
        },
      },
    });
  };

  const getContent = () => {
    return (
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Name" value={name} onChange={setName} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={email}
              onChange={onEmailChange}
              error={!!emailError.length}
              errorText={emailError}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">Select a role for this user</Typography>
            <FormControl>
              <Select
                className={classes.selector}
                variant="outlined"
                value={role}
                onChange={(event) => onRoleChange(event)}
              >
                <MenuItem value={Role.PAID_USER}>Paid User</MenuItem>
                <MenuItem value={Role.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {organizationsData &&
            userOrganization &&
            haveAccess(roles, [Role.SUPER_ADMIN]) && (
              <Grid item xs={6}>
                <Typography variant="body2">
                  Select user&apos;s organization
                </Typography>
                <FormControl>
                  <Select
                    className={classes.selector}
                    variant="outlined"
                    value={organizationId}
                    onChange={(event) => onOrganizationChange(event)}
                  >
                    {organizationsData.organizations.map(
                      (org: { name: string; id: number }) => (
                        <MenuItem key={org.id} value={org.id}>
                          {org.name}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}
        </Grid>
        <Box className={classes.hint}>
          <Typography variant="body2">
            An email will be sent to the email above with instructions to join.
          </Typography>
        </Box>
      </Grid>
    );
  };

  const getControls = () => {
    return (
      <>
        {!(completed || error) ? (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              className={classes.dialogButton}
              onClick={handleUserCreation}
              disabled={isInviteButtonDisabled()}
            >
              Invite
            </Button>
          </>
        ) : (
          <Button onClick={handleClose}>Ok</Button>
        )}
      </>
    );
  };

  const getMessageModalProps = () => {
    return {
      message: error ? 'Failed to send an invite' : 'User successfully invited',
      messageHint: error ? '' : 'An email with verification link was sent',
      Icon: error ? ErrorIcon : CheckIcon,
    };
  };

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      setName('');
      setEmail('');
      setOrganizationId(userOrganization.id);
      setRole(Role.PAID_USER);
      setCompleted(false);
      setError(false);
      setEmailError('');
    }, 200);
  };

  return (
    <DialogWrapper
      open={open}
      onClose={handleClose}
      dialogTitle="Invite User"
      dialogContent={
        completed || error ? (
          <CreateDatasetMessage {...getMessageModalProps()} />
        ) : (
          getContent()
        )
      }
      dialogControls={getControls()}
      width={716}
      height={335}
      isMaximizable={false}
    />
  );
};

export default InviteUserDialog;
