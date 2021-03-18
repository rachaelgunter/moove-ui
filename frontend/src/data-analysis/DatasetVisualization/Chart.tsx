import React from 'react';
import { makeStyles } from '@material-ui/core';

import VisualizationBlock, {
  VisualizationBlockParams,
} from './VisualizationBlock';

interface ChartParams extends Omit<VisualizationBlockParams, 'children'> {
  onLoad: () => void;
  onError: () => void;
  src: string;
  height: number;
}

const useStyles = makeStyles({
  chart: {
    maxWidth: '100%',
  },
});

const Chart: React.FC<ChartParams> = ({
  onLoad,
  onError,
  src,
  height,
  loading,
}: ChartParams) => {
  const classes = useStyles();
  return (
    <VisualizationBlock loading={loading}>
      <img
        onLoad={onLoad}
        onError={onError}
        height={height}
        className={classes.chart}
        src={src}
        alt=""
      />
    </VisualizationBlock>
  );
};

export default Chart;
