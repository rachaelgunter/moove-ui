import React, { useContext, useEffect, useState } from 'react';
import TextField from 'src/shared/TextField';
import { Divider } from '@material-ui/core';

import DatasourceSelector from '../DatasourceSelector';
import CreateDatasetContext from '../CreateDatasetContext';

const MAX_DESCRIPTION_LENGTH = 16384;

export const DESCRIPTION_MAX_LENGTH_ERROR =
  'Maximum description length is limited to 16384 characters';
export const DATASET_NAME_ERROR =
  'Name should contain only alphanumeric characters, underscores or dashes';

const SelectSourcePage: React.FC = () => {
  const [descriptionError, setDescriptionError] = useState('');
  const [nameError, setNameError] = useState('');

  const { state, dispatch } = useContext(CreateDatasetContext);

  useEffect(() => {
    dispatch({
      pageHaveError: Boolean(
        nameError ||
          descriptionError ||
          (!state.selectedTable && !state.selectedFile) ||
          !state.name.length,
      ),
    });
  }, [
    dispatch,
    nameError,
    descriptionError,
    state.name.length,
    state.selectedFile,
    state.selectedTable,
  ]);

  const onNameChangeWrapper = (updatedName: string) => {
    dispatch({
      name: updatedName,
    });
    updateNameErrorState(updatedName);
  };

  const onDescriptionChangeWrapper = (updatedDescription: string) => {
    dispatch({
      description: updatedDescription,
    });
    updateDescriptionErrorState(updatedDescription);
  };

  const updateDescriptionErrorState = (updatedDescription: string) => {
    if (updatedDescription.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(DESCRIPTION_MAX_LENGTH_ERROR);
    } else {
      setDescriptionError('');
    }
  };

  const updateNameErrorState = (updatedName: string) => {
    if (updatedName.match(/^[a-zA-Z0-9-_]*$/)) {
      setNameError('');
    } else {
      setNameError(DATASET_NAME_ERROR);
    }
  };

  return (
    <>
      <TextField
        label="Name"
        value={state.name}
        onChange={onNameChangeWrapper}
        error={!!nameError.length}
        errorText={nameError}
      />
      <TextField
        label="Description"
        value={state.description}
        onChange={onDescriptionChangeWrapper}
        error={!!descriptionError.length}
        errorText={descriptionError}
        multiline
      />
      <Divider />
      <DatasourceSelector />
    </>
  );
};

export default SelectSourcePage;
