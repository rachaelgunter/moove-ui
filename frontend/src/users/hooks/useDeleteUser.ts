import { useMutation, StoreObject, MutationTuple } from '@apollo/client';

import { DELETE_USER_MUTATION } from '../mutations';
import { UserRemovalResponse, UserRemovalPayload } from '../types';

const useDeleteUser = (): MutationTuple<
  UserRemovalResponse,
  UserRemovalPayload
> =>
  useMutation<UserRemovalResponse, UserRemovalPayload>(DELETE_USER_MUTATION, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { email } = data.deleteUser;

      cache.modify({
        id: cache.identify({ __typename: 'Query' }),
        fields: {
          users(existingUsers, { readField }) {
            const nodes = existingUsers.nodes.filter(
              (datasetRef: StoreObject) =>
                email !== readField('email', datasetRef),
            );

            return {
              ...existingUsers,
              totalCount: nodes.length,
              nodes,
            };
          },
        },
      });
    },
  });

export default useDeleteUser;
