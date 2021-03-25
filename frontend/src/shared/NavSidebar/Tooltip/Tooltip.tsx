import React from 'react';
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.bg.lighter,
    fontSize: 13,
    boxShadow: '0 2px 9px 0 rgba(0, 0, 0, 0.23)',
    padding: theme.spacing(1, 1.5),
    borderRadius: 6,
    maxWidth: 200,
  },
  arrow: {
    color: theme.palette.bg.lighter,
  },
  tooltipPlacementRight: {
    margin: theme.spacing(0),
  },
}));

const Tooltip: React.FC<TooltipProps> = ({
  children,
  ...otherProps
}: TooltipProps) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      arrow
      disableFocusListener
      disableTouchListener
      placement="right"
      classes={{
        tooltip: classes.tooltip,
        arrow: classes.arrow,
        tooltipPlacementRight: classes.tooltipPlacementRight,
      }}
      {...otherProps}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
