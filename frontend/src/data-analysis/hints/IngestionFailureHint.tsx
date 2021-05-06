import React from 'react';

import IngestionFailureIcon from 'src/assets/images/warning.svg';
import HintTemplate, { HintTemplateBaseProps } from './HintTemplate';

const IngestionFailureHint: React.FC<HintTemplateBaseProps> = ({
  datasetModel,
}: HintTemplateBaseProps) => (
  <HintTemplate
    label="Ingestion failed."
    imageSrc={IngestionFailureIcon}
    datasetModel={datasetModel}
  />
);

IngestionFailureHint.defaultProps = {
  datasetModel: undefined,
};

export default IngestionFailureHint;
