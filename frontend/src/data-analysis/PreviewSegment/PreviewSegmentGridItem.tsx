import { Grid, Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, ReactElement } from 'react';
import theme from 'src/app/styles';
import { FontFamily } from '../../app/styles/fonts';

interface PreviewSegmentGridItemProps {
  title: string;
  loading: boolean;
  children: ReactElement | ReactElement[];
  backgroundColor?: string;
}

const useStyles = (backgroundColor: string) =>
  makeStyles(() => ({
    column: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor,
      width: '100%',
      marginBottom: theme.spacing(1),
    },
    title: {
      fontSize: 12,
      fontFamily: FontFamily.ROBOTO,
      letterSpacing: '0.11px',
      margin: theme.spacing(1),
      flex: '0 0 auto',
    },
    wrap: {
      position: 'relative',
      flex: '1 0 auto',
      width: '100%',
    },
    content: {
      overflow: 'auto',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      height: '100%',
      weight: '100%',
      padding: '0 7px',
      fontSize: 12,
      fontFamily: FontFamily.ROBOTO,
      letterSpacing: '0.11px',
    },
    overlay: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  }))();

const PreviewSegmentGridItem: FC<PreviewSegmentGridItemProps> = ({
  children,
  loading,
  title,
  backgroundColor = theme.palette.bg.dark,
}: PreviewSegmentGridItemProps) => {
  const classes = useStyles(backgroundColor);

  return (
    <Grid item className={classes.column}>
      <Typography className={classes.title} variant="subtitle1">
        {title}
      </Typography>
      <Box className={classes.wrap}>
        <Box className={classes.content}>
          {loading ? (
            <Box className={classes.overlay}>
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </Box>
      </Box>
    </Grid>
  );
};

PreviewSegmentGridItem.defaultProps = {
  backgroundColor: theme.palette.bg.dark,
};

export default PreviewSegmentGridItem;
