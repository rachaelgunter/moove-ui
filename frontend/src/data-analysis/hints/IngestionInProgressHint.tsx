import React from 'react';

import IngestionInProgressImage from 'src/assets/images/empty-state-ingestion-in-progress.svg';
import HintTemplate from './HintTemplate';

const IngestionInProgressHint: React.FC = () => (
  <HintTemplate
    label="Ingestion In Progress…."
    imageSrc={IngestionInProgressImage}
  />
);

export default IngestionInProgressHint;
