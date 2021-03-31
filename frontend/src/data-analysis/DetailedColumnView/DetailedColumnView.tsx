import React, { FC, useState } from 'react';
import { Box, Button, makeStyles, Tabs, Tab, Theme } from '@material-ui/core';
import { FontFamily } from 'src/app/styles/fonts';
import DialogWrapper from 'src/shared/DialogWrapper/DialogWrapper';
import ColumnViewBreadcrumbs from './ColumnViewBreadcrumbs';
import ColumnViewTabPanel from './ColumnViewTabPanel';
import ColumnViewMap from './ColumnViewMap';
import ColumnViewAnalytics from './ColumnViewAnalytics';
import ColumnViewRelationships from './ColumnViewRelationships';
import { ColumnModel } from '../types';

interface DetailedColumnViewProps {
  open: boolean;
  column: ColumnModel;
  datasetName: string;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background: theme.palette.bg.dark,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
  },
  dialogButton: {
    fontFamily: FontFamily.ROBOTO,
    color: theme.palette.text.secondary,
    height: '36px',
    letterSpacing: '1.25px',
    marginLeft: theme.spacing(1),

    '&:disabled': {
      color: '#455a64',
    },
  },
  tab: {
    textTransform: 'none',
    fontSize: 13,
    minHeight: '39px',
    minWidth: '50px',
    padding: '10px 20px 9px 21px',
  },
  tabs: {
    minHeight: '39px',
  },
}));

const DetailedColumnView: FC<DetailedColumnViewProps> = ({
  open,
  column,
  datasetName,
  onClose,
}: DetailedColumnViewProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (
    _: React.ChangeEvent<Record<string, string>>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  const Controls = () => (
    <Button
      onClick={onClose}
      className={classes.dialogButton}
      data-testid="dialog-close-button"
    >
      Close
    </Button>
  );
  const Content = () => (
    <>
      <Box className={classes.header}>
        <ColumnViewBreadcrumbs
          columnName={column.name}
          datasetName={datasetName}
        />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabs}
        >
          <Tab
            className={classes.tab}
            label="Analytics"
            data-testid="dialog-analytics-tab"
          />
          <Tab
            className={classes.tab}
            label="Map"
            data-testid="dialog-map-tab"
          />
          <Tab
            className={classes.tab}
            label="Relationships"
            data-testid="dialog-relationships-tab"
          />
        </Tabs>
      </Box>
      <ColumnViewTabPanel value={value} index={0}>
        <ColumnViewAnalytics column={column} analysisName={datasetName} />
      </ColumnViewTabPanel>
      <ColumnViewTabPanel value={value} index={1}>
        <ColumnViewMap columnName={column.name} analysisName={datasetName} />
      </ColumnViewTabPanel>
      <ColumnViewTabPanel value={value} index={2}>
        <ColumnViewRelationships column={column} analysisName={datasetName} />
      </ColumnViewTabPanel>
    </>
  );

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      dialogTitle="Column Details"
      dialogControls={<Controls />}
      dialogContent={<Content />}
    />
  );
};

export default DetailedColumnView;
