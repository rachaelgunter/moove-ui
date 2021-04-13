import React, { useContext } from 'react';

import CreateDatasetContext from '../CreateDatasetContext';

const IngestionOptionsPage: React.FC = () => {
  const { name } = useContext(CreateDatasetContext);
  return <>IngestionOptionsPage {name}</>;
};

export default IngestionOptionsPage;
