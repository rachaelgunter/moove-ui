// eslint-disable-next-line import/prefer-default-export
export const getKeplerConfig = (columnName: string): unknown => ({
  version: 'v1',
  config: {
    visState: {
      filters: [],
      layers: [
        {
          id: columnName,
          type: 'geojson',
          config: {
            dataId: `${columnName} analysis_data`,
            label: columnName,
            color: [30, 150, 190],
            columns: {
              geojson: 'source_geom',
            },
            isVisible: true,
            visConfig: {
              opacity: 0.8,
              strokeOpacity: 0.8,
              thickness: 2,
              strokeColor: null,
              colorRange: {
                name: 'Global Warming',
                type: 'sequential',
                category: 'Uber',
                colors: [
                  '#5A1846',
                  '#900C3F',
                  '#C70039',
                  '#E3611C',
                  '#F1920E',
                  '#FFC300',
                ],
              },
              strokeColorRange: {
                name: 'Global Warming',
                type: 'sequential',
                category: 'Uber',
                colors: [
                  '#5A1846',
                  '#900C3F',
                  '#C70039',
                  '#E3611C',
                  '#F1920E',
                  '#FFC300',
                ],
              },
              radius: 10,
              sizeRange: [0, 10],
              radiusRange: [0, 50],
              heightRange: [0, 500],
              elevationScale: 5,
              stroked: false,
              filled: true,
              enable3d: false,
              wireframe: false,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: 'start',
                alignment: 'center',
              },
            ],
          },
          visualChannels: {
            colorField: {
              name: columnName,
            },
            colorScale: 'quantile',
            strokeColorField: null,
            strokeColorScale: 'quantile',
            sizeField: null,
            sizeScale: 'linear',
            heightField: null,
            heightScale: 'linear',
            radiusField: null,
            radiusScale: 'linear',
          },
        },
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            [`${columnName} analysis_data`]: [
              {
                name: columnName,
                format: null,
              },
            ],
          },
          compareMode: false,
          compareType: 'absolute',
          enabled: true,
        },
        brush: {
          size: 0.5,
          enabled: false,
        },
        geocoder: {
          enabled: false,
        },
        coordinate: {
          enabled: false,
        },
      },
      layerBlending: 'normal',
      splitMaps: [],
      animationConfig: {
        currentTime: null,
        speed: 1,
      },
    },
    mapState: {
      bearing: 0,
      dragRotate: false,
      latitude: 39.633448,
      longitude: -111.93026900000001,
      pitch: 0,
      zoom: 3,
      isSplit: false,
    },
    mapStyle: {
      styleType: 'dark',
      topLayerGroups: {},
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: true,
        water: true,
        land: true,
        '3d building': false,
      },
      threeDBuildingColor: [
        9.665468314072013,
        17.18305478057247,
        31.1442867897876,
      ],
      mapStyles: {},
    },
  },
});
