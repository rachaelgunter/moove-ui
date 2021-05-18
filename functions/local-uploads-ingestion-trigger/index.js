const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

const bigquery = new BigQuery();
const storage = new Storage();

const LOCAL_FILES_BUCKET_NAME = process.env.LOCAL_FILES_BUCKET_NAME;
const LOCAL_FILES_PROJECT_NAME = process.env.LOCAL_FILES_PROJECT_NAME;
const LOCAL_FILES_DATASET_NAME = process.env.LOCAL_FILES_DATASET_NAME;

async function createTableFromCSV(organizationName, analysisName, fileName) {
  const tableId = `${organizationName}_${analysisName}_${Date.now()}`;
  const datasetId = LOCAL_FILES_DATASET_NAME;
  const GCSFileName = `${organizationName}/${analysisName}/${fileName}`;

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

  console.log(
    `Temporary table creation job ${job.id} for ${organizationName} ${analysisName} completed.`
  );

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
