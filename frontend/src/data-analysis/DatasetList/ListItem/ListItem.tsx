import React from 'react';
import {
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemProps as MuiListItemProps,
  ListItemText as MuiListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

import FailureIcon from 'src/data-analysis/icons/FailureIcon';
import { DatasetStatus } from '../../types';
import { ActiveIcon, ProcessingIcon } from '../../icons';

interface ListItemProps extends MuiListItemProps {
  label: string;
  status: DatasetStatus;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 64,
    borderTop: `1px solid ${theme.palette.grey[700]}`,
  },
  gutters: {
    padding: theme.spacing(2, 3),
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
}));

const ListItemText = withStyles((theme: Theme) =>
  createStyles({
    primary: {
      display: 'inline-block',
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
    },
  }),
)(MuiListItemText);

const ListItem: React.FC<ListItemProps> = ({
  label,
  status,
  selected,
  onClick,
}: ListItemProps) => {
  const classes = useStyles();

  const statusIconsMap: { [key in DatasetStatus]: React.FC } = {
    [DatasetStatus.PROCESSING]: ProcessingIcon,
    [DatasetStatus.ACTIVE]: ActiveIcon,
    [DatasetStatus.FAILED]: FailureIcon,
  };

  const Icon = statusIconsMap[status];

  return (
    <MuiListItem
      button
      classes={{
        root: classes.root,
        gutters: classes.gutters,
      }}
      selected={selected}
      onClick={onClick}
    >
      <ListItemIcon className={classes.listItemIcon}>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          variant: 'subtitle2',
          color: 'textPrimary',
        }}
        primary={label}
      />
    </MuiListItem>
  );
};

export default ListItem;
