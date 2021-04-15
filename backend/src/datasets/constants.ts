export const DEFAULT_INGESTION_PARAMS = {
  lat: 'latitude',
  lon: 'longitude',
  primary_ts: 'received_time',
  extraneous_geographies: [],
  groupby_col: 'adminarea_3',
  jenks_cols: [
    'heading_deg',
    'accelerateVector',
    'errorAmplitudeVector',
    'temperatureExterior',
    'rainIntensity',
  ],
  distance_from_road: 50,
  validation_sample_perc: 0.05,
  sampling_perc: 0.95,
  training_sample_perc: 0.5,
  sampling_max: 150000,
  moove_stats_cols: ['temp_c', 'gust_mph', 'precip_mm', 'vis_km'],
};

export const RELATIONSHIPS_VISUALIZATIONS_FOLDERS = [
  '/joint_plot',
  '/scatter_plot',
];
