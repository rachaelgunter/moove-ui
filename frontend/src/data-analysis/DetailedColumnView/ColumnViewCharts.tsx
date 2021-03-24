import {
  createStyles,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';
import React, { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { User } from 'src/auth/UserProvider';
import LightboxImage from 'src/shared/LightboxImage/LightboxImage';
import theme from 'src/app/styles';

const GRID_COLUMNS_NUMBER = 3;
const GRID_COLUMNS_SPACING = theme.spacing(2.75);

interface ColumnViewChartsProps {
  chartsUrls: string[];
  user: User;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'auto',
    },
    chartImage: {
      height: '100%',
    },
    wrapper: {
      marginRight: -(GRID_COLUMNS_SPACING / 2),
      paddingLeft: GRID_COLUMNS_SPACING / 2,
    },
  }),
);

const ColumnViewCharts: FC<ColumnViewChartsProps> = ({
  chartsUrls,
  user,
}: ColumnViewChartsProps) => {
  const classes = useStyles();

  const authorizedChartsUrls = chartsUrls?.map(
    (url) => `${url}?authuser=${user.email}`,
  );

  const calculateHeight = (totalWidth: number) => {
    return totalWidth / GRID_COLUMNS_NUMBER - GRID_COLUMNS_SPACING;
  };

  if (!authorizedChartsUrls) {
    return <>No charts available for this column</>;
  }

  return (
    <>
      <AutoSizer className={classes.wrapper}>
        {({ height, width }) => (
          <GridList
            style={{ width, height }}
            cellHeight={calculateHeight(width)}
            spacing={GRID_COLUMNS_SPACING}
            className={classes.root}
            cols={GRID_COLUMNS_NUMBER}
          >
            {authorizedChartsUrls?.map((chart, index) => (
              <GridListTile
                key={chart}
                cols={1}
                rows={1}
                data-testid={`tile-${index}`}
              >
                <LightboxImage
                  imgUrl={chart}
                  imgStyles={{
                    height: '100%',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  alt=""
                />
              </GridListTile>
            ))}
          </GridList>
        )}
      </AutoSizer>
    </>
  );
};

export default ColumnViewCharts;
