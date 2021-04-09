const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

const bigquery = new BigQuery();
const storage = new Storage();

const bucketName = 'galileo-datasets-files';

async function loadCSVFromGCS(analysisName, GCSFileName) {
  const datasetId = 'galileo_ingestions_user_uploads';
  const tableId = analysisName;

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    autodetect: true,
    location: 'US',
  };

  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(bucketName).file(GCSFileName), metadata);

  console.log(`Job ${job.id} completed.`);

  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}

exports.main = async (req, res) => {
  const { fileName, analysisName } = req.body;

  if (!fileName || !analysisName) {
    res.status(400).send('Invalid request');
  }

  await loadCSVFromGCS(analysisName, fileName);

  res.status(200).send('OK');
};
