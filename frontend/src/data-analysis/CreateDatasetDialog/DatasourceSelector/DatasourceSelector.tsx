import React, { FC, useContext } from 'react';
import { Box, Divider, makeStyles, Tab, Tabs, Theme } from '@material-ui/core';

import { FontFamily } from 'src/app/styles/fonts';
import TablesTreeView from 'src/data-analysis/TablesTreeView/TablesTreeView';
import Typography from 'src/shared/Typography';
import { ReactComponent as UploadIcon } from 'src/assets/icons/upload.svg';
import { ReactComponent as BigQueryIcon } from 'src/assets/icons/database.svg';
import Dropzone from 'src/shared/Dropzone/Dropzone';
import CreateDatasetContext from '../CreateDatasetContext';

const useStyles = makeStyles((theme: Theme) => ({
  datasourceSelector: {
    margin: '24px 0 30px 0',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  tabs: {
    marginBottom: '18px',
  },
  tab: {
    border: '1px solid',
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.divider,
    padding: '21px',
    marginRight: '18px',
    background: theme.palette.bg.lighter,
    color: '#fff',

    '&:last-child': {
      marginRight: 0,
    },
  },
  selected: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
  tabsIndicator: {
    display: 'none',
  },
  fileUploader: {
    height: 264,
    flexGrow: 1,
    width: 665,
  },
  divider: {
    marginBottom: '20px',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
TabPanel.defaultProps = {
  children: null,
};

const DatasourceSelector: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { handleTableSelect, handleFileSelect } = useContext(
    CreateDatasetContext,
  );

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number,
  ) => {
    if (newValue === value) {
      return;
    }
    handleTableSelect(null);
    handleFileSelect(null);
    setValue(newValue);
  };

  return (
    <Box className={classes.datasourceSelector}>
      <Typography className={classes.title} fontFamily={FontFamily.ROBOTO}>
        Select location to import data from
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{ root: classes.tabs, indicator: classes.tabsIndicator }}
        variant="fullWidth"
        centered
      >
        <Tab
          classes={{ root: classes.tab, selected: classes.selected }}
          icon={<BigQueryIcon />}
          label="BigQuery Table"
        />
        <Tab
          classes={{ root: classes.tab, selected: classes.selected }}
          icon={<UploadIcon />}
          label="File Upload"
        />
      </Tabs>
      <Divider className={classes.divider} />
      <TabPanel value={value} index={0}>
        <TablesTreeView onTableSelect={handleTableSelect} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className={classes.fileUploader}>
          <Dropzone onDrop={(files) => handleFileSelect(files[0] ?? null)} />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default DatasourceSelector;
