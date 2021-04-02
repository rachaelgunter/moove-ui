import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useRef } from 'react';
import {
  CameraFlyTo,
  CesiumComponentRef,
  GeoJsonDataSource,
  Viewer,
  Entity,
} from 'resium';
import {
  Cartesian3,
  Color,
  createWorldTerrain,
  GeoJsonDataSource as CesiumGeoJsonDataSource,
  ImageMaterialProperty,
  Ion,
  Viewer as CesiumViewer,
  SceneMode,
} from 'cesium';
import icons from './signIcons';
import 'cesium/Widgets/widgets.css';

interface PreviewSegmentChartProps {
  data: {
    geometryGeojson: {
      coordinates: [number, number][];
    };
    trafficSignOffset: {
      point_geojson: string;
      level_4_sign: string;
    }[];
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  viewer: {
    margin: 0,
  },
  cesium: {
    '&:fullscreen': {
      position: 'fixed',
    },
  },
  startEndButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    left: 7,
    zIndex: 9,
    opacity: 0.8,
    '& > button': {
      display: 'inline-block',
      margin: '2px 3px',
      borderRadius: '6px',
      background: '#303336',
      padding: '2px 8px',
      textTransform: 'none',
      fontSize: 12,
      '&:hover': {
        background: 'rgba(34, 45, 51, 1)',
      },
    },
  },
}));

Ion.defaultAccessToken =
  process.env.REACT_APP_CESIUM_ION_DEFAULT_ACCESS_TOKEN || '';
CesiumGeoJsonDataSource.clampToGround = true;

let viewer: CesiumViewer | undefined;

const PreviewSegmentCesium: FC<PreviewSegmentChartProps> = ({
  data,
}: PreviewSegmentChartProps) => {
  const classes = useStyles();
  const refViewer = useRef<CesiumComponentRef<CesiumViewer>>(null);
  useEffect(() => {
    if (refViewer.current?.cesiumElement) {
      viewer = refViewer.current.cesiumElement;
    }
  }, []);
  // const viewerComponent = useMemo(() => {
  const { coordinates } = data.geometryGeojson;
  const startLat = coordinates[0][0];
  const startLon = coordinates[0][1];
  const endLat = coordinates[coordinates.length - 1][0];
  const endLon = coordinates[coordinates.length - 1][1];
  const segmentGeoJson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: {}, geometry: data.geometryGeojson },
    ],
  };

  if (!coordinates || coordinates.length === 0) {
    return <div>No data</div>;
  }

  const toggleStartEnd = () => {
    if (!viewer) {
      return;
    }

    const entityStart = viewer.entities.getOrCreateEntity('startCircle');
    const entityFinish = viewer.entities.getOrCreateEntity('finishCircle');
    entityStart.show = !entityStart.show;
    entityFinish.show = !entityFinish.show;
  };
  const segmentDataSource = CesiumGeoJsonDataSource.load(
    {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: {}, geometry: data.geometryGeojson },
      ],
    },
    {
      stroke: Color.CORNFLOWERBLUE,
      fill: Color.CYAN,
      strokeWidth: 3,
      markerSymbol: '?',
    },
  );

  function toggleSceneMode() {
    if (!viewer) {
      return;
    }

    if (viewer.scene.mode === SceneMode.SCENE2D) {
      viewer.scene.mode = SceneMode.SCENE3D;
    } else {
      viewer.scene.mode = SceneMode.SCENE2D;
    }
    viewer.zoomTo(segmentDataSource);
  }

  function toggleSigns() {
    if (!viewer?.entities?.values?.length) {
      return;
    }
    viewer.entities.values
      .filter((item) => item.id.indexOf('sign-') === 0)
      .forEach((entity) => {
        // eslint-disable-next-line no-param-reassign
        entity.show = !entity.show;
      });
  }

  const options = data.trafficSignOffset
    .filter((item) => item?.level_4_sign && icons[item.level_4_sign])
    .map((item, index) => {
      const signGeo = JSON.parse(item.point_geojson);
      const signlat = signGeo.coordinates[0];
      const signlon = signGeo.coordinates[1];

      return {
        position: Cartesian3.fromDegrees(signlat, signlon, 150000.0),
        name: `sign${index}`,
        ellipse: {
          semiMinorAxis: 30.0,
          semiMajorAxis: 30.0,
          material: new ImageMaterialProperty({
            image: icons[item.level_4_sign],
          }),
        },
        id: `sign-${index}`,
        show: false,
      };
    });
  return (
    <div className={classes.cesium} id="cesium-fullscreen">
      <div className={classes.toolbar}>
        <Button onClick={() => toggleSceneMode()}>3D/2D</Button>
        <Button onClick={() => toggleStartEnd()}>Show Start/End</Button>
        <Button onClick={() => toggleSigns()}>Show Signs</Button>
      </div>

      <Viewer
        ref={refViewer}
        className={classes.viewer}
        terrainProvider={createWorldTerrain()}
        scene3DOnly={false}
        sceneModePicker={false}
        baseLayerPicker={false}
        vrButton={false}
        animation={false}
        infoBox={false}
        homeButton={false}
        selectionIndicator={false}
        timeline={false}
        fullscreenButton
        fullscreenElement="cesium-fullscreen"
        full
      >
        <CameraFlyTo
          destination={Cartesian3.fromDegrees(startLat, startLon, 5000)}
          duration={10}
        />
        <GeoJsonDataSource
          data={segmentGeoJson}
          stroke={Color.CORNFLOWERBLUE}
          fill={Color.CYAN}
          strokeWidth={3}
          markerSymbol="hospital"
        />
        <Entity
          position={Cartesian3.fromDegrees(startLat, startLon, 150000.0)}
          name="start"
          ellipse={{
            semiMinorAxis: 50.0,
            semiMajorAxis: 50.0,
            material: new ImageMaterialProperty({ image: icons.START }),
          }}
          id="startCircle"
          show={false}
        />
        <Entity
          position={Cartesian3.fromDegrees(endLat, endLon, 150000.0)}
          name="end"
          ellipse={{
            semiMinorAxis: 50.0,
            semiMajorAxis: 50.0,
            material: new ImageMaterialProperty({ image: icons.FINISH }),
          }}
          id="finishCircle"
          show={false}
        />
        {options.map((itemOptions) => {
          return <Entity key={itemOptions.id} {...itemOptions} />;
        })}
      </Viewer>
    </div>
  );
};

export default PreviewSegmentCesium;
