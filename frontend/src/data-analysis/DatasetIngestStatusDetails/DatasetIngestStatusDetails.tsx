import React, { FC, ReactNode, useState } from 'react';
import { Button, Link, makeStyles, Theme, TableRow } from '@material-ui/core';

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
    marginBottom: '2px',
  },
  row: {
    '&:last-child td': {
      border: 'none',
    },

    textTransform: 'uppercase',

    '& td': {
      width: '80%',
    },

    '& td:last-child': {
      width: '20%',
    },
  },
}));

const DatasetIngestStatusDetails: FC<DatasetIngestStatusProps> = ({
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
    <Table columnNames={['Ingestion Step', 'Status']}>
      {ingestStatus.map(({ ingestionStep, status }) => (
        <TableRow className={classes.row} key={ingestionStep}>
          <TableCell>{ingestionStep}</TableCell>
          <TableCell>
            <Highlighter status={status} />
          </TableCell>
        </TableRow>
      ))}
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
        dialogTitle="Ingestion Status"
        dialogControls={<Controls />}
        dialogContent={<Content />}
        isMaximizable={false}
        width={720}
      />
    </>
  );
};

export default DatasetIngestStatusDetails;
