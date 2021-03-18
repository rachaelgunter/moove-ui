import {
  createStyles,
  GridList,
  GridListTile,
  makeStyles,
} from '@material-ui/core';
import React, { FC } from 'react';
import { User } from 'src/auth/UserProvider';
import AutoSizer from 'react-virtualized-auto-sizer';

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
  }),
);

const ColumnViewCharts: FC<ColumnViewChartsProps> = ({
  chartsUrls,
  user,
}: ColumnViewChartsProps) => {
  const classes = useStyles();

  const GRID_COLUMNS_NUMBER = 3;
  const GRID_COLUMNS_SPACING = 22;

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
    <AutoSizer>
      {({ height, width }) => (
        <GridList
          style={{ width, height }}
          cellHeight={calculateHeight(width)}
          spacing={GRID_COLUMNS_SPACING}
          className={classes.root}
          cols={GRID_COLUMNS_NUMBER}
        >
          {authorizedChartsUrls?.map((chart) => (
            <GridListTile key={chart} cols={1} rows={1}>
              <img className={classes.chartImage} src={chart} alt={chart} />
            </GridListTile>
          ))}
        </GridList>
      )}
    </AutoSizer>
  );
};

export default ColumnViewCharts;
