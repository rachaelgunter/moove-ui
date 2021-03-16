import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KeplerGl from 'kepler.gl';
import { addDataToMap, wrapTo } from 'kepler.gl/actions';
import { KeplerConfig } from './KeplerConfig';

interface KeplerWrapperProps {
  data: unknown;
  height: number;
  width: number;
}

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const KeplerWrapper: FC<KeplerWrapperProps> = ({
  data,
  height,
  width,
}: KeplerWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      wrapTo(
        'foo',
        addDataToMap({
          datasets: data,
          options: {
            centerMap: true,
          },
          config: KeplerConfig,
        }),
      ),
    );
  }, [data, dispatch]);

  return (
    <KeplerGl
      id="foo"
      width={width}
      mapboxApiAccessToken={TOKEN}
      height={height}
    />
  );
};

export default KeplerWrapper;
