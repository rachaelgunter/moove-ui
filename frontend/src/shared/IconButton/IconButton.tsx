import React from 'react';
import {
  fade,
  IconButton as MuiIconButton,
  IconButtonProps,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 32,
    width: 32,
    backgroundColor: theme.palette.bg[600],
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: fade(theme.palette.bg[600], 0.8),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  sizeSmall: {
    height: 20,
    width: 20,
    padding: theme.spacing(0.5),
    fontSize: theme.typography.pxToRem(16),
  },
}));

const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...otherProps
}: IconButtonProps) => {
  const classes = useStyles();
  return (
    <MuiIconButton
      {...otherProps}
      classes={{
        root: classes.root,
        sizeSmall: classes.sizeSmall,
      }}
    >
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
