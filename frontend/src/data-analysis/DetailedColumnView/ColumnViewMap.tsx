import React, { FC } from 'react';
import KeplerGl from 'kepler.gl';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const ColumnViewMap: FC = () => {
  return (
    <KeplerGl id="foo" width={992} mapboxApiAccessToken={TOKEN} height={604} />
  );
};

export default ColumnViewMap;
