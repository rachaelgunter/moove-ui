import {
  IconButton,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { DatasetModel } from 'src/data-analysis/types';
import { AlertDialogType } from 'src/shared/AlertDialog/AlertDialog';
import AlertDialog from 'src/shared/AlertDialog';
import Typography from 'src/shared/Typography';
import { UserContext } from 'src/auth/UserProvider';
import useDeleteDataset from '../hooks/useDeleteDataset';

interface DatasetDetailsMenuProps {
  isDatasetActive: boolean;
  datasetModel: DatasetModel;
  resetDatasetModel: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textAlign: 'left',
    width: '100%',
  },
  actionsMenu: {
    width: 140,
  },
  actionsMenuItem: {
    fontFamily: FontFamily.ROBOTO,
    '& > a, & > button': {
      color: theme.palette.text.primary,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    '& > button p': {
      fontFamily: FontFamily.ROBOTO,
    },
  },
  actionsMenuButton: {
    color: '#fff',
    marginRight: '15px',
  },
}));

const DatasetDetailsMenu: FC<DatasetDetailsMenuProps> = ({
  isDatasetActive,
  datasetModel,
  resetDatasetModel,
}: DatasetDetailsMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deletionError, setDeletionError] = useState('');

  const [deleteDataset, { loading }] = useDeleteDataset();

  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);

  const onSwitch = () => setOpen(!open);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    deleteDataset({
      variables: {
        analysisName: datasetModel.name,
        analysisProject: user.GCPProjectName,
      },
    })
      .then(() => {
        resetDatasetModel();
      })
      .catch(() => {
        setDeletionError(
          'Unable to delete this dataset. Please try again later.',
        );
      })
      .finally(() => {
        onSwitch();
      });
  };

  return (
    <>
      <IconButton
        className={classes.actionsMenuButton}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        classes={{ list: classes.actionsMenu }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isDatasetActive && (
          <MenuItem className={classes.actionsMenuItem}>
            <Link href={process.env.REACT_APP_JUPYTERHUB_URL}>
              View Notebook
            </Link>
          </MenuItem>
        )}
        <MenuItem className={classes.actionsMenuItem} onClick={onSwitch}>
          <Link className={classes.link} component="button">
            <Typography color="textPrimary" variant="body1">
              Delete
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
      <AlertDialog
        open={open}
        title="You are about to delete this dataset."
        message="This action cannot be undone. Do you want to proceed?"
        actionButtonTitle="Delete"
        hasAction
        onAction={onDelete}
        onClose={onSwitch}
        loading={loading}
        type={AlertDialogType.DANGER}
      />
      <AlertDialog
        open={!!deletionError.length}
        title="Error"
        message={deletionError}
        onClose={() => setDeletionError('')}
        type={AlertDialogType.DANGER}
      />
    </>
  );
};

export default DatasetDetailsMenu;
