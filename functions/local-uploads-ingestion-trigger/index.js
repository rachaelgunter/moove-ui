const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');
const { GoogleAuth } = require('google-auth-library');
const { URL } = require('url');

const auth = new GoogleAuth();
const bigquery = new BigQuery();
const storage = new Storage();

// TODO: extract to env variables
const LOCAL_FILES_BUCKET_NAME = 'galileo-datasets-files';
const INGESTION_TRIGGER_CLOUD_FUNCTION_URL =
  'https://us-central1-moove-road-iq-staging.cloudfunctions.net/galileo-ingest';
const LOCAL_FILES_PROJECT_NAME = 'moove-platform-lineate-dev';
const LOCAL_FILES_DATASET_NAME = 'galileo_ingestions_user_uploads';

async function createTableFromCSV(organizationName, analysisName, GCSFileName) {
  const tableId = `${organizationName}_${analysisName}_${Date.now()}`;
  const datasetId = LOCAL_FILES_DATASET_NAME;

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    autodetect: true,
    location: 'US',
  };

  console.log(
    `Temporary table creation job for ${organizationName} ${analysisName} started.`
  );

  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(LOCAL_FILES_BUCKET_NAME).file(GCSFileName), metadata);

  console.log(`Temporary table creation job ${job.id} completed.`);

  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
  return tableId;
}

async function triggerIngestion(ingestionOptions) {
  console.log(
    `Triggering ingestion process for dataset: ${JSON.stringify(
      ingestionOptions
    )}`
  );

  const {
    name: analysis_name,
    tableId: source_table,
    datasetId: source_dataset,
    projectId: source_project,
    description: analysis_description,
    organizationName: client,
    analysisProject: analysis_project,
    assetsBucket: visual_asset_bucket,
  } = ingestionOptions;

  const targetAudience = new URL(INGESTION_TRIGGER_CLOUD_FUNCTION_URL).origin;
  const httpClient = await auth.getIdTokenClient(targetAudience);
  const ingestorResponse = await httpClient.request({
    url,
    method: 'POST',
    body: {
      analysis_name,
      analysis_project,
      source_dataset,
      source_dataset,
      source_table,
      analysis_description,
      source_project,
      visual_asset_bucket,
      client,
    },
  });
  console.log(
    `Ingestion successfully triggered for dataset: ${JSON.stringify(
      ingestionOptions
    )}`
  );
  return ingestorResponse;
}

exports.main = async (req, res) => {
  const {
    fileName,
    analysisName,
    description = '',
    organizationName,
    analysisProject,
    assetsBucket,
  } = req.body;

  if (
    !fileName ||
    !analysisName ||
    !organizationName ||
    !analysisName ||
    !assetsBucket
  ) {
    res.status(400).send('Invalid request');
  }

  try {
    const tableId = await createTableFromCSV(
      organizationName,
      analysisName,
      fileName
    );
    const result = await triggerIngestion({
      tableId,
      description,
      organizationName,
      analysisProject,
      assetsBucket,
      name: analysisName,
      datasetId: LOCAL_FILES_DATASET_NAME,
      projectId: LOCAL_FILES_PROJECT_NAME,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
