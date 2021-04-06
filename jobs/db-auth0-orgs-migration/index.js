const fs = require('fs');
const path = require('path');
const { ManagementClient } = require('auth0');
const dotenv = require('dotenv');

dotenv.config();

const usersFilePath = process.argv[2];
const orgsFilePath = process.argv[3];

const auth0Client = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

const readData = async (filePath) => {
  const data = await fs.promises.readFile(path.join(__dirname, filePath));
  return JSON.parse(data);
};

const timeout = (duration) => {
  return new Promise((resolve) => setTimeout(() => resolve(), duration));
};

const mapUsersToOrgs = (usersData, orgsData) => {
  const users = usersData.User;
  const orgs = orgsData.Organization;

  return users
    .filter((user) => user.organizationId)
    .map((user) => {
      const { organizationId } = user;
      const { GCSBucketName, ...organization } = orgs.find((org) => org.id === organizationId);

      return {
        id: user.id,
        organization,
      };
    });
};

const updateMetadata = async (userId, organization) => {
  const existingMetadata = await auth0Client.getUser(userId).app_metadata;
  const result = await auth0Client.updateAppMetadata({ id: userId }, { ...existingMetadata, organization });
  return result;
};

// Timeout is to avoid hitting auth0 API limits
const updateUsers = (usersData) => {
  return usersData.reduce((res, userPayload) => {
    const { organization } = userPayload;

    return res
      .then(() => console.log(`Updating org for user = ${userPayload.id}`))
      .then(() => updateMetadata(userPayload.id, organization))
      .then(() => timeout(500));
  }, Promise.resolve());
};

Promise.all([readData(usersFilePath), readData(orgsFilePath)])
  .then(([users, orgs]) => mapUsersToOrgs(users, orgs))
  .then((data) => updateUsers(data));
