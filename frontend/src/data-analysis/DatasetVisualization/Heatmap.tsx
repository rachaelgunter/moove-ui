import React from 'react';
import { makeStyles } from '@material-ui/core';
import VisualizationBlock, {
  VisualizationBlockParams,
} from './VisualizationBlock';

interface HeatmapParams extends Omit<VisualizationBlockParams, 'children'> {
  onLoad: () => void;
  onError: () => void;
  src: string;
  height: number;
}

const useStyles = makeStyles({
  iframe: ({ height }: { height: number }) => ({
    height,
    border: 'none',
    width: '100%',
  }),
});

const Heatmap: React.FC<HeatmapParams> = ({
  onLoad,
  onError,
  src,
  height,
  loading,
}: HeatmapParams) => {
  const classes = useStyles({ height });
  return (
    <VisualizationBlock loading={loading}>
      <iframe
        frameBorder="0"
        title="Heatmap"
        src={src}
        className={classes.iframe}
        onLoad={onLoad}
        onError={onError}
      />
    </VisualizationBlock>
  );
};

export default Heatmap;
