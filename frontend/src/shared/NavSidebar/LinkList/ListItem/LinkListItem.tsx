import React, { useContext } from 'react';
import {
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import Tooltip from 'src/shared/NavSidebar/Tooltip';
import { NavSidebarContext } from 'src/shared/NavSidebar/NavSidebarProvider';
import BaseListItem, { BaseListItemProps } from './BaseListItem';

type LinkListItemProps<C extends React.ElementType, D> = BaseListItemProps<
  C,
  D
> & {
  label: string;
  Icon: SvgIconComponent;
};

interface StyleProps {
  isExpanded: boolean;
}

const useStyles = makeStyles<Theme, StyleProps, string>((theme: Theme) => ({
  listItemText: {
    fontSize: 13,
    fontWeight: 500,
  },
  listItemIcon: ({ isExpanded }: StyleProps) => ({
    minWidth: 0,
    marginRight: theme.spacing(isExpanded ? 2 : 3),
  }),
  colorPrimaryIcon: {
    color: '#90a0b7',
  },
  colorPrimaryText: {
    color: '#728aa0',
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
}));

const LinkListItem: <C extends React.ElementType>(
  props: LinkListItemProps<C, { component?: C }>,
) => JSX.Element = <C extends React.ElementType>({
  label,
  Icon,
  selected,
  ...other
}: LinkListItemProps<C, { component?: C }>) => {
  const { isExpanded } = useContext(NavSidebarContext);

  const classes = useStyles({ isExpanded });

  return (
    <Tooltip
      data-testid="listItem-tooltip"
      title={(!isExpanded && label) || ''}
    >
      <BaseListItem selected={selected} {...other}>
        <ListItemIcon
          classes={{
            root: classes.listItemIcon,
          }}
        >
          <Icon
            classes={{
              colorPrimary: classes.colorPrimaryIcon,
              colorSecondary: classes.colorSecondary,
            }}
            color={selected ? 'secondary' : 'primary'}
            fontSize="small"
          />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography
            className={classes.listItemText}
            classes={{
              colorPrimary: classes.colorPrimaryText,
              colorSecondary: classes.colorSecondary,
            }}
            color={selected ? 'secondary' : 'primary'}
          >
            {label}
          </Typography>
        </ListItemText>
      </BaseListItem>
    </Tooltip>
  );
};

export default LinkListItem;
