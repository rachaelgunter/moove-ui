import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

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
  const { data } = useQuery(
    DATASET_COLUMN_VISUALIZATIONS_OF_JOINT_PLOTS_QUERY,
    {
      variables: {
        bucketName: process.env.REACT_APP_DATASET_ASSETS_BUCKET,
        analysisName,
        columnName: column.name,
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
