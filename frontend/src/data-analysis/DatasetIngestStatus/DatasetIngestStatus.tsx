import React, { FC, ReactNode, useState } from 'react';
import { Button, Link, makeStyles, TableRow, Theme } from '@material-ui/core';

import DialogWrapper, {
  useDialogWrapperStyles,
} from 'src/shared/DialogWrapper/DialogWrapper';
import Table, { TableCell } from 'src/shared/Table';
import { DatasetModel } from '../types';
import Highlighter from './Highlighter';

interface DatasetIngestStatusProps {
  datasetModel: DatasetModel;
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.text.secondary,
    marginBottom: '2px', // TODO Fix this
  },
  row: {
    '&:last-child td': {
      border: 'none',
    },
  },
}));

const DatasetIngestStatus: FC<DatasetIngestStatusProps> = ({
  datasetModel,
  children,
}: DatasetIngestStatusProps) => {
  const classes = useStyles();
  const dialogWrapperClasses = useDialogWrapperStyles();

  const { ingestStatus } = datasetModel;

  const [open, setOpen] = useState(false);

  const onSwitch = () => setOpen(!open);

  const Controls = () => (
    <Button onClick={onSwitch} className={dialogWrapperClasses.dialogButton}>
      Close
    </Button>
  );

  const Content = () => (
    <Table columnNames={['Status', 'Value']}>
      {Object.keys(ingestStatus).map((key) =>
        key !== '__typename' ? (
          <TableRow className={classes.row} key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>
              <Highlighter status={ingestStatus[key]} />
            </TableCell>
          </TableRow>
        ) : (
          <></>
        ),
      )}
    </Table>
  );

  return (
    <>
      <Link
        className={classes.link}
        onClick={onSwitch}
        component="button"
        variant="body1"
      >
        {children}
      </Link>
      <DialogWrapper
        open={open}
        onClose={onSwitch}
        dialogTitle="Ingest Status"
        dialogControls={<Controls />}
        dialogContent={<Content />}
        isMaximizable={false}
      />
    </>
  );
};

export default DatasetIngestStatus;
