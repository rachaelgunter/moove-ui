import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KeplerGl from 'kepler.gl';
import { addDataToMap, wrapTo } from 'kepler.gl/actions';
import { getKeplerConfig } from './KeplerConfig';

interface KeplerWrapperProps {
  data: unknown;
  height: number;
  width: number;
  columnName: string;
}

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const KeplerWrapper: FC<KeplerWrapperProps> = ({
  data,
  height,
  width,
  columnName,
}: KeplerWrapperProps) => {
  const dispatch = useDispatch();
  const keplerInstanceId = `${columnName}_KEPLER_INSTANCE`;

  useEffect(() => {
    dispatch(
      wrapTo(
        keplerInstanceId,
        addDataToMap({
          datasets: data,
          options: {
            centerMap: true,
          },
          config: getKeplerConfig(columnName),
        }),
      ),
    );
  }, [data, dispatch, keplerInstanceId, columnName]);

  return (
    <KeplerGl
      id={keplerInstanceId}
      width={width}
      mapboxApiAccessToken={TOKEN}
      height={height}
    />
  );
};

export default KeplerWrapper;
