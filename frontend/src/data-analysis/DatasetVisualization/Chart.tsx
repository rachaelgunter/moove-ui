import React from 'react';

import LightboxImage from 'src/shared/LightboxImage/LightboxImage';
import VisualizationBlock, {
  VisualizationBlockParams,
} from './VisualizationBlock';

interface ChartParams extends Omit<VisualizationBlockParams, 'children'> {
  onLoad: () => void;
  onError: () => void;
  src: string;
  height: number;
}

const Chart: React.FC<ChartParams> = ({
  onLoad,
  onError,
  src,
  height,
  loading,
}: ChartParams) => {
  const styles = {
    maxWidth: '100%',
    cursor: 'pointer',
    height,
  };
  return (
    <VisualizationBlock loading={loading}>
      <LightboxImage
        imgUrl={src}
        alt=""
        onLoad={onLoad}
        onError={onError}
        imgStyles={styles}
      />
    </VisualizationBlock>
  );
};

export default Chart;
