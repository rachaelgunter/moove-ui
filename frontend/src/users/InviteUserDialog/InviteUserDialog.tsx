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
import DialogWrapper from 'src/shared/DialogWrapper';
import TextField from 'src/shared/TextField';
import { Role } from 'src/shared/types';
import { isValidEmail } from 'src/shared/utils';

interface InviteUserDialogProps {
  open: boolean;
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
}));

const InviteUserDialog: FC<InviteUserDialogProps> = ({
  open,
  onClose,
  onComplete,
}: InviteUserDialogProps) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(Role.PAID_USER);
  const [emailError, setEmailError] = useState('');

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
          <Grid item xs={6}>
            <Typography variant="body2">
              Select user&apos;s organization
            </Typography>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button>Invite</Button>
      </>
    );
  };

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      dialogTitle="Invite User"
      dialogContent={getContent()}
      dialogControls={getControls()}
      width={716}
      height={335}
      isMaximizable={false}
    />
  );
};

export default InviteUserDialog;
