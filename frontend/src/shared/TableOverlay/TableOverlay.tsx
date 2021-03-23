import { CircularProgress, Link, makeStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import React, { FC, ReactElement } from 'react';
import { FontFamily } from 'src/app/styles/fonts';

interface TableOverlayProps {
  loading: boolean;
  error: boolean;
  children: ReactElement;
  height?: number;
  data: unknown;
}

const useStyles: (
  height: number,
) => ClassNameMap<'overlayWrapper' | 'overlay' | 'errorMessage'> = (
  height: number,
) =>
  makeStyles(() => ({
    overlayWrapper: {
      position: 'relative',
      width: '100%',
      minHeight: height,
    },
    overlay: {
      opacity: 0.5,
      backgroundColor: '#000',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      width: '100%',
      height,
      zIndex: 10,
    },
    errorMessage: {
      fontFamily: FontFamily.POPPINS,
      color: '#fff',
      fontSize: '13px',
      minHeight: height,
    },
  }))();

const TableOverlay: FC<TableOverlayProps> = ({
  loading,
  error,
  children,
  data,
  height = 440,
}: TableOverlayProps) => {
  const classes = useStyles(height);

  return (
    <div
      className={
        !loading && error ? classes.errorMessage : classes.overlayWrapper
      }
    >
      {loading && (
        <div className={classes.overlay}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <div>
          Unable to load data, please try later. if the problem persists,
          contact support:{' '}
          <Link href="mailto:systems@moove.ai" color="inherit">
            systems@moove.ai
          </Link>
        </div>
      )}
      {!error && data && children}
    </div>
  );
};

TableOverlay.defaultProps = {
  height: 440,
};

export default TableOverlay;
