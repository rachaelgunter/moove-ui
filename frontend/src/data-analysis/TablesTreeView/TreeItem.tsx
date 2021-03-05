import { SvgIconProps, Theme } from '@material-ui/core';
import { TreeItemProps, TreeItem } from '@material-ui/lab';
import { makeStyles, createStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import Typography from 'src/shared/Typography';

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

export default StyledTreeItem;
