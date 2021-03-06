import React from 'react';
import {
  Button,
  ButtonProps,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme: Theme) => {
  const backgroundColor = '#00918b';
  return {
    root: {
      width: 144,
      boxShadow: '0 4px 10px 0 rgba(16, 156, 241, 0.24)',
    },
    containedPrimary: {
      backgroundColor,
      '&:hover': {
        backgroundColor: fade(backgroundColor, 0.9),
        '@media (hover: none)': {
          backgroundColor,
        },
      },
    },
  };
});

const CreateButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Button
      disableElevation
      id="dataset-new"
      classes={{
        root: classes.root,
        containedPrimary: classes.containedPrimary,
      }}
      variant="contained"
      color="primary"
      size="small"
      startIcon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
