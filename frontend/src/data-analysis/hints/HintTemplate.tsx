import React, { ReactNode } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { DatasetModel } from '../types';
import DatasetIngestStatus from '../DatasetIngestStatus';

export interface HintTemplateBaseProps {
  datasetModel?: DatasetModel;
}
interface HintTemplateProps extends HintTemplateBaseProps {
  label: string | ReactNode;
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
  datasetModel,
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
          {datasetModel ? (
            <>
              {' '}
              Click{' '}
              <DatasetIngestStatus datasetModel={datasetModel}>
                here
              </DatasetIngestStatus>{' '}
              for details
            </>
          ) : (
            <></>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HintTemplate;
