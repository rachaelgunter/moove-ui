import React, { FC } from 'react';

import { useQuery } from '@apollo/client';
import { GridOn } from '@material-ui/icons';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { BIG_QUERY_TABLES_QUERY } from '../queries';
import { BigQueryDataset, BigQueryProject, BigQueryTable } from '../types';
import StyledTreeItem from './TreeItem';

interface DatasetSubtreeProps {
  dataset: BigQueryDataset;
  project: BigQueryProject;
}

const DatasetSubtree: FC<DatasetSubtreeProps> = ({
  dataset,
  project,
}: DatasetSubtreeProps) => {
  const { data } = useQuery(BIG_QUERY_TABLES_QUERY, {
    variables: {
      tablesParams: {
        projectId: project.projectId,
        datasetId: dataset.datasetId,
      },
    },
  });

  const getTableTreeItemId = (
    projectId: string,
    datasetId: string,
    tableId: string,
  ): string => {
    return `${projectId}:${datasetId}:${tableId}:table`;
  };

  return (
    <>
      {!data ? (
        <StyledTreeItem
          nodeId={`${dataset.datasetId}:loader`}
          labelText="loading..."
          labelIcon={ScheduleIcon}
        />
      ) : (
        data.tables?.map((table: BigQueryTable) => (
          <StyledTreeItem
            key={getTableTreeItemId(
              data.projectId,
              data.datasetId,
              table.tableId,
            )}
            nodeId={getTableTreeItemId(
              data.projectId,
              data.datasetId,
              table.tableId,
            )}
            labelText={table.tableId}
            labelIcon={GridOn}
          />
        ))
      )}
    </>
  );
};

export default DatasetSubtree;
