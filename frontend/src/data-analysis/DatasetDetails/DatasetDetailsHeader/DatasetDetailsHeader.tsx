import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

import { DatasetDetailsProps } from 'src/data-analysis/DatasetDetails/DatasetDetails';
import { DatasetStatus } from 'src/data-analysis/types';
import { ActiveRoundedIcon } from 'src/data-analysis/icons';
import IconButton from 'src/shared/IconButton';
import EditableLabel from 'src/data-analysis/DatasetDetails/DatasetDetailsHeader/EditableLabel';
import { FontFamily } from 'src/app/styles/fonts';
import Typography from 'src/shared/Typography';
import StatusChip from './StatusChip';
import SpecificationColumn from './SpecificationColumn';

type DatasetDetailsHeaderProps = DatasetDetailsProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
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
  },
}));

const DatasetDetailsHeader: React.FC<DatasetDetailsHeaderProps> = ({
  datasetModel,
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

  const isProcessing = datasetModel.status === DatasetStatus.PROCESSING;
  const createdOn = isProcessing ? '—' : datasetModel.creationDate;
  const totalRows = isProcessing
    ? '—'
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
              variant="h5"
              color="textPrimary"
              fontFamily={FontFamily.ROBOTO}
              className={classes.ellipsis}
            >
              {datasetModel.name}
            </Typography>
          </Grid>
          <Grid item container wrap="nowrap">
            <SpecificationColumn title="Status">
              <StatusChip status={datasetModel.status} />
            </SpecificationColumn>
            <SpecificationColumn title="Created On">
              <ThinText>{createdOn}</ThinText>
            </SpecificationColumn>
            <SpecificationColumn title="Total Rows">
              <ThinText>{totalRows}</ThinText>
            </SpecificationColumn>
          </Grid>
          <Grid item className={classes.actions}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
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
