import React from 'react';
import { List, makeStyles, Theme } from '@material-ui/core';

import { DatasetModel } from 'src/data-analysis/types';
import ListItem from './ListItem';
import ListSubheader from './ListSubheader';

interface DatasetListProps {
  datasets: DatasetModel[];
  selectedDataset: DatasetModel | null;
  onSelect: (dataset: DatasetModel) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.light,
    borderRadius: theme.shape.borderRadius,
  },
}));

const DatasetList: React.FC<DatasetListProps> = ({
  datasets,
  selectedDataset,
  onSelect,
}: DatasetListProps) => {
  const classes = useStyles();

  return (
    <List disablePadding subheader={<ListSubheader />} className={classes.root}>
      {datasets.map((dataset) => {
        const { id, name, status } = dataset;
        return (
          <ListItem
            key={id}
            onClick={() => onSelect(dataset)}
            label={name}
            status={status}
            selected={!!selectedDataset && selectedDataset.id === id}
          />
        );
      })}
    </List>
  );
};

export default DatasetList;
