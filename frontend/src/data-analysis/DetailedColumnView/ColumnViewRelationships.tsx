import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/client';

import { UserContext } from 'src/auth/UserProvider';
import { DATASET_COLUMN_RELATIONSHIPS_VISUALIZATIONS_QUERY } from '../queries';
import { ColumnModel } from '../types';
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

  const { data } = useQuery(DATASET_COLUMN_RELATIONSHIPS_VISUALIZATIONS_QUERY, {
    variables: {
      bucketName: user.GCSBucketName,
      analysisName,
      columnName: column.name,
      organizationName: user.organization,
    },
  });

  const sections = [
    {
      title: 'All Joint and Scatter Plots',
      chartsUrls: data
        ? data.datasetColumnVisualizations.relationshipsVisualizations
        : undefined,
    },
  ];

  return (
    <ColumnViewContainer>
      <ColumnViewContent sections={sections} />
    </ColumnViewContainer>
  );
};

export default ColumnViewRelationships;
