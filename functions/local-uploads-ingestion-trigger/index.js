const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

const bigquery = new BigQuery();
const storage = new Storage();

// TODO: extract to env variables
const LOCAL_FILES_BUCKET_NAME = 'galileo-datasets-files';
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
  return { tableId, datasetId, projectId: LOCAL_FILES_PROJECT_NAME };
}

exports.main = async (req, res) => {
  const { fileName, analysisName, organizationName } = req.body;

  if (!fileName || !analysisName || !organizationName) {
    res.status(400).send('Invalid request');
  }

  try {
    const result = await createTableFromCSV(
      organizationName,
      analysisName,
      fileName
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
