import React from 'react';

import NoDatasetsImage from 'src/assets/images/empty-state-no-datasets.svg';
import HintTemplate from './HintTemplate';

const NoDatasetsHint: React.FC = () => (
  <HintTemplate label="No datasets yet. Add one?" imageSrc={NoDatasetsImage} />
);

export default NoDatasetsHint;
