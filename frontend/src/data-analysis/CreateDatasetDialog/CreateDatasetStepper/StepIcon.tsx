import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { CheckCircle } from '@material-ui/icons';
import { StepIconProps } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    display: 'block',
    color: theme.palette.primary.main,
  },
  active: {
    border: 'solid 2px rgba(255, 255, 255, 0.5)',
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
}));

const StepIcon: React.FC<StepIconProps> = ({
  icon,
  completed,
  active,
}: StepIconProps) => {
  const classes = useStyles();

  if (completed) {
    return <CheckCircle className={classes.completed} />;
  }

  return (
    <div
      className={clsx(classes.circle, {
        [classes.active]: active,
      })}
    >
      <span className={classes.text}>{icon}</span>
    </div>
  );
};

export default StepIcon;
