import React, { ChangeEvent, FC, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import { gql, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  BigQueryDataset,
  BigQueryProject,
  BigQueryProjectsResponse,
  BigQueryTable,
} from '../types';
import StyledTreeItem from './TreeItem';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

const BIG_QUERY_PROJECTS_QUERY = gql`
  query Projects {
    getUsersProjects {
      projectId
      datasets {
        datasetId
      }
    }
  }
`;

interface DatasetSubtreeProps {
  dataset: BigQueryDataset;
  project: BigQueryProject;
}

const BIG_QUERY_TABLES_QUERY = gql`
  query Tables($tablesParams: BigQueryTablesParams!) {
    tables(tablesParams: $tablesParams) {
      tableId
      datasetId
    }
  }
`;

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
            nodeId={`${table.tableId}:table`}
            labelText={table.tableId}
            labelIcon={StorageIcon}
          />
        ))
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.dark,
    height: 264,
    flexGrow: 1,
    width: 665,
    overflowY: 'auto',
  },
}));

const TablesTreeView: FC = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);

  const { data } = useQuery<BigQueryProjectsResponse>(BIG_QUERY_PROJECTS_QUERY);

  const handleNodeSelect = (
    _: ChangeEvent<Record<string, unknown>>,
    value: string,
  ) => {
    setSelected(value);
  };

  const handleNodeToggle = (
    _: ChangeEvent<Record<string, unknown>>,
    ids: string[],
  ) => {
    setExpanded(ids);
  };

  const checkExpanded = (id: string) => {
    return expanded.includes(id);
  };

  const constructTree = ({ getUsersProjects }: BigQueryProjectsResponse) => {
    return getUsersProjects?.map((project) => (
      <StyledTreeItem
        nodeId={project.projectId}
        labelText={project.projectId}
        labelIcon={StorageIcon}
      >
        {project?.datasets?.map((dataset) => (
          <StyledTreeItem
            nodeId={`${dataset.datasetId}:dataset`}
            labelText={dataset.datasetId}
            labelIcon={StorageIcon}
          >
            {checkExpanded(`${dataset.datasetId}:dataset`) ? (
              <DatasetSubtree project={project} dataset={dataset} />
            ) : (
              <div />
            )}
          </StyledTreeItem>
        ))}
      </StyledTreeItem>
    ));
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<NavigateNextIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      selected={selected}
      expanded={expanded}
      onNodeSelect={handleNodeSelect}
      onNodeToggle={handleNodeToggle}
    >
      {data ? constructTree(data) : <CircularProgress />}
    </TreeView>
  );
};

export default TablesTreeView;
