import React, { ChangeEvent, FC, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import GridOnIcon from '@material-ui/icons/GridOn';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  labelIcon: React.ElementType<SvgIconProps>;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '40px',
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&$selected > $content': {
        backgroundColor: 'rgba(35, 94, 94, 0.76)',
      },
    },
    content: {
      minHeight: '40px',
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    iconContainer: {
      margin: theme.spacing(1),
    },
    expanded: {},
    selected: {
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderLeft: 'none',
      borderRight: 'none',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      margin: theme.spacing(0, 2, 0, 0),
    },
    labelText: {
      flexGrow: 1,
      color: theme.palette.text.primary,
    },
  }),
);

const StyledTreeItem: FC<StyledTreeItemProps> = (
  props: StyledTreeItemProps,
) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        iconContainer: classes.iconContainer,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
      }}
      {...other}
    />
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

  const handleNodeSelect = (
    _: ChangeEvent<Record<string, unknown>>,
    value: string,
  ) => {
    setSelected(value);
  };

  // TODO: replace with user's BQ tables
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<NavigateNextIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      selected={selected}
      onNodeSelect={handleNodeSelect}
    >
      <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={StorageIcon} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={StorageIcon} />
      <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={StorageIcon}>
        <StyledTreeItem nodeId="5" labelText="Social" labelIcon={GridOnIcon} />
        <StyledTreeItem nodeId="6" labelText="Updates" labelIcon={GridOnIcon} />
        <StyledTreeItem nodeId="7" labelText="Forums" labelIcon={GridOnIcon} />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={GridOnIcon}
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="History" labelIcon={StorageIcon} />
    </TreeView>
  );
};

export default TablesTreeView;
