export interface Organization {
  id: number;
  name: string;
  GCSBucketName: string;
  GCPProjectName: string;
}

export type DeletedUser = {
  email: string;
};

export type UserRemovalResponse = {
  deleteUser: DeletedUser;
};

export type UserRemovalPayload = {
  deleteUserPayload: { email: string; sub: string };
};
