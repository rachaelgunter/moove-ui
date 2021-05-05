import React from 'react';

import IngestionInProgressImage from 'src/assets/images/empty-state-ingestion-in-progress.svg';
import HintTemplate, { HintTemplateBaseProps } from './HintTemplate';

const IngestionInProgressHint: React.FC<HintTemplateBaseProps> = ({
  datasetModel,
}: HintTemplateBaseProps) => (
  <HintTemplate
    label="Ingestion In Progress…."
    imageSrc={IngestionInProgressImage}
    datasetModel={datasetModel}
  />
);

IngestionInProgressHint.defaultProps = {
  datasetModel: undefined,
};

export default IngestionInProgressHint;
