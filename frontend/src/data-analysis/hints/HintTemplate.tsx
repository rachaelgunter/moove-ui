import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

interface HintTemplateProps {
  label: string;
  imageSrc: string;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '25%',
    bottom: 'auto',
  },
});

const HintTemplate: React.FC<HintTemplateProps> = ({
  label,
  imageSrc,
}: HintTemplateProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <img src={imageSrc} alt="" />
      </Grid>
      <Grid item>
        <Typography variant="body1" color="textSecondary">
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HintTemplate;
