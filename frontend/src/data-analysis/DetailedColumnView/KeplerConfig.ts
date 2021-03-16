// eslint-disable-next-line import/prefer-default-export
export const KeplerConfig = {
  version: 'v1',
  config: {
    visState: {
      filters: [],
      layers: [
        {
          id: '8r0xqd',
          type: 'point',
          config: {
            dataId: '6dhgg4oof',
            label: 'Point',
            color: [246, 209, 138],
            columns: {
              lat: 'latitude',
              lng: 'longitude',
              altitude: null,
            },
            isVisible: true,
            visConfig: {
              radius: 11,
              fixedRadius: false,
              opacity: 0.8,
              outline: true,
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
              radiusRange: [0, 50],
              filled: true,
            },
            hidden: false,
            textLabel: [],
          },
          visualChannels: {
            colorField: {
              name: 'distance_from_incident',
              type: 'real',
            },
            colorScale: 'quantile',
            strokeColorField: null,
            strokeColorScale: 'quantile',
            sizeField: null,
            sizeScale: 'linear',
          },
        },
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            '6dhgg4oof': [
              {
                name: 'here_segment_id',
                format: null,
              },
              {
                name: 'distance_from_incident',
                format: null,
              },
              {
                name: 'heading_deg',
                format: null,
              },
              {
                name: 'accelerateVector',
                format: null,
              },
              {
                name: 'errorAmplitudeVector',
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
      latitude: 39.72719001828028,
      longitude: -105.00142787402388,
      pitch: 0,
      zoom: 10,
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
};
