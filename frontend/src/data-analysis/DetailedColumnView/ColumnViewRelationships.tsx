import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/client';

import { UserContext } from 'src/auth/UserProvider';
import { DATASET_COLUMN_VISUALIZATIONS_OF_JOINT_PLOTS_QUERY } from '../queries';
import { ColumnModel, ColumnVisualizationSubFolder } from '../types';
import ColumnViewContent from './ColumnViewContent';
import ColumnViewContainer from './ColumnViewContainer';

interface ColumnViewRelationshipsProps {
  column: ColumnModel;
  analysisName: string;
}

const ColumnViewRelationships: FC<ColumnViewRelationshipsProps> = ({
  column,
  analysisName,
}: ColumnViewRelationshipsProps) => {
  const user = useContext(UserContext);

  const { data } = useQuery(
    DATASET_COLUMN_VISUALIZATIONS_OF_JOINT_PLOTS_QUERY,
    {
      variables: {
        bucketName: process.env.REACT_APP_DATASET_ASSETS_BUCKET,
        analysisName,
        columnName: column.name,
        organizationName: user.organization,
        subFolder: ColumnVisualizationSubFolder.JOINT_PLOTS,
      },
    },
  );

  const sections = [
    {
      title: 'All Joint Plots',
      chartsUrls: data ? data.datasetColumnVisualizations : undefined,
    },
  ];

  return (
    <ColumnViewContainer>
      <ColumnViewContent sections={sections} />
    </ColumnViewContainer>
  );
};

export default ColumnViewRelationships;
