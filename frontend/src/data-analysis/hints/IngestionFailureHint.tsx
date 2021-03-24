import React from 'react';

import IngestionFailureIcon from 'src/assets/images/warning.svg';
import HintTemplate from './HintTemplate';

const IngestionFailureHint: React.FC = () => (
  <HintTemplate
    label="Ingestion failed. Please contact support."
    imageSrc={IngestionFailureIcon}
  />
);

export default IngestionFailureHint;
