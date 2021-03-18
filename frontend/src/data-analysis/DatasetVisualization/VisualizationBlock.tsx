import React from 'react';
import { Fade, Grid } from '@material-ui/core';

export interface VisualizationBlockParams {
  loading: boolean;
  children: React.ReactElement;
}

const VisualizationBlock: React.FC<VisualizationBlockParams> = ({
  loading,
  children,
}: VisualizationBlockParams) => {
  return (
    <Grid item>
      <Fade in={!loading}>{children}</Fade>
    </Grid>
  );
};

export default VisualizationBlock;
