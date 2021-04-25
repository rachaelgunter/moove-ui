import { useMutation } from '@apollo/client';

import { DELETE_USER_MUTATION } from '../mutations';

const useDeleteUser = () => useMutation(DELETE_USER_MUTATION);

export default useDeleteUser;
