import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';

import { DatasetDetailsProps } from 'src/data-analysis/DatasetDetails/DatasetDetails';
import { DatasetStatus } from 'src/data-analysis/types';
import { ActiveRoundedIcon } from 'src/data-analysis/icons';
import EditableLabel from 'src/data-analysis/DatasetDetails/DatasetDetailsHeader/EditableLabel';
import { FontFamily } from 'src/app/styles/fonts';
import Typography from 'src/shared/Typography';
import StatusChip from './StatusChip';
import SpecificationColumn from './SpecificationColumn';
import DatasetDetailsMenu from './DatasetDetailsMenu/DatasetDetailsMenu';

type DatasetDetailsHeaderProps = DatasetDetailsProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  ellipsis: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
  thinText: {
    wordBreak: 'break-word',
    fontFamily: FontFamily.ROBOTO,
    fontWeight: theme.typography.fontWeightLight,
    fontSize: 14,
    lineHeight: 1.57,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    minWidth: theme.spacing(6),
  },
}));

const DatasetDetailsHeader: React.FC<DatasetDetailsHeaderProps> = ({
  datasetModel,
  resetDatasetModel,
}: DatasetDetailsHeaderProps) => {
  const classes = useStyles();

  // TODO change with mutation
  const [description, setDescription] = useState<string>(
    datasetModel.description,
  );

  const onDescriptionChanged = (value: string) => {
    setDescription(value);
  };

  const ThinText = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="subtitle2"
      color="textPrimary"
      fontFamily={FontFamily.ROBOTO}
      className={classes.thinText}
    >
      {children}
    </Typography>
  );

  const formatStringWithCommas = (str: string): string =>
    str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const isActive = datasetModel.status === DatasetStatus.ACTIVE;
  const createdOn = !isActive ? '???' : datasetModel.createdAt;
  const totalRows = !isActive
    ? '???'
    : formatStringWithCommas(datasetModel.totalRows.toString());

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container spacing={2} direction="column">
        <Grid item container spacing={2} wrap="nowrap" alignItems="center">
          <Grid item>
            <ActiveRoundedIcon />
          </Grid>
          <Grid item xs={5}>
            <Typography
              id="dataset-name"
              variant="h5"
              color="textPrimary"
              fontFamily={FontFamily.ROBOTO}
              className={classes.ellipsis}
            >
              {datasetModel.name}
            </Typography>
          </Grid>
          <Grid item container wrap="nowrap">
            <SpecificationColumn title="Status" id="dataset-status">
              <StatusChip status={datasetModel.status} />
            </SpecificationColumn>
            <SpecificationColumn title="Created On" id="dataset-created-on">
              <ThinText>{createdOn}</ThinText>
            </SpecificationColumn>
            <SpecificationColumn title="Total Rows" id="dataset-total-rows">
              <ThinText>{totalRows}</ThinText>
            </SpecificationColumn>
          </Grid>
          <Grid item className={classes.actions} id="dataset-actions">
            <DatasetDetailsMenu
              isDatasetActive={isActive}
              resetDatasetModel={resetDatasetModel}
              datasetModel={datasetModel}
            />
          </Grid>
        </Grid>
        <Grid item id="dataset-edit">
          <EditableLabel
            value={description}
            onChange={onDescriptionChanged}
            inputProps={{
              className: classes.thinText,
            }}
            labelTypographyProps={{
              variant: 'subtitle2',
              color: 'textPrimary',
              fontFamily: FontFamily.ROBOTO,
              className: classes.thinText,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DatasetDetailsHeader;
