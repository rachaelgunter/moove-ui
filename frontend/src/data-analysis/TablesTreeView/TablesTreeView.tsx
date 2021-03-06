import React, { ChangeEvent, FC, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { BigQueryProjectsResponse, TableIdentity } from '../types';
import StyledTreeItem from './TreeItem';
import GCPProjectIcon from '../icons/GCPProjectIcon';
import { BIG_QUERY_PROJECTS_QUERY } from '../queries';
import DatasetSubtree from './DatasetSubtree';
import CreateDatasetContext from '../CreateDatasetDialog/CreateDatasetContext';

interface TablesTreeViewProps {
  selected: TableIdentity | null;
  onTableSelect: (params: TableIdentity) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.dark,
    height: 264,
    flexGrow: 1,
    width: 665,
    overflowY: 'auto',
  },
  loaderContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const TablesTreeView: FC<TablesTreeViewProps> = ({
  onTableSelect,
  selected,
}: TablesTreeViewProps) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CreateDatasetContext);

  const { data } = useQuery<BigQueryProjectsResponse>(BIG_QUERY_PROJECTS_QUERY);

  const handleNodeSelect = (
    _: ChangeEvent<Record<string, unknown>>,
    value: string,
  ) => {
    if (value.includes('table')) {
      const [projectId, datasetId, tableId] = value.split(':');
      onTableSelect({ projectId, datasetId, tableId });
    }
  };

  const handleNodeToggle = (
    _: ChangeEvent<Record<string, unknown>>,
    ids: string[],
  ) => {
    dispatch({ bigQuerySelectorExpandedRows: ids });
  };

  const checkExpanded = (id: string) => {
    return state.bigQuerySelectorExpandedRows.includes(id);
  };

  const getDatasetTreeItemId = (
    projectId: string,
    datasetId: string,
  ): string => {
    return `${projectId}:${datasetId}:${datasetId}:dataset`;
  };

  const constructTree = ({ getUsersProjects }: BigQueryProjectsResponse) => {
    return getUsersProjects?.map((project) => (
      <StyledTreeItem
        key={project.projectId}
        nodeId={project.projectId}
        labelText={project.projectId}
        labelIcon={GCPProjectIcon}
      >
        {project?.datasets?.map((dataset) => {
          const datasetId = getDatasetTreeItemId(
            project.projectId,
            dataset.datasetId,
          );
          return (
            <StyledTreeItem
              key={datasetId}
              nodeId={datasetId}
              labelText={dataset.datasetId}
              labelIcon={StorageIcon}
            >
              {checkExpanded(datasetId) ? (
                <DatasetSubtree project={project} dataset={dataset} />
              ) : (
                <div />
              )}
            </StyledTreeItem>
          );
        })}
      </StyledTreeItem>
    ));
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<NavigateNextIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      selected={selected ? `${Object.values(selected).join(':')}:table` : ''}
      expanded={state.bigQuerySelectorExpandedRows}
      onNodeSelect={handleNodeSelect}
      onNodeToggle={handleNodeToggle}
    >
      {data ? (
        constructTree(data)
      ) : (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      )}
    </TreeView>
  );
};

export default TablesTreeView;
