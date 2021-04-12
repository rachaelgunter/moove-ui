import React, { FC, useContext, useState } from 'react';
import { Link, makeStyles } from '@material-ui/core';
import { StoreObject, useMutation } from '@apollo/client';

import Typography from 'src/shared/Typography';
import AlertDialog from 'src/shared/AlertDialog';
import { AlertDialogType } from 'src/shared/AlertDialog/AlertDialog';
import { DELETE_DATASET_MUTATION } from 'src/data-analysis/mutations';
import { UserContext } from 'src/auth/UserProvider';

const useStyles = makeStyles({
  link: {
    textAlign: 'left',
    width: '100%',
  },
});

interface ArchiverProps {
  datasetId: string;
  resetDatasetModel: () => void;
}

const Archiver: FC<ArchiverProps> = ({
  datasetId,
  resetDatasetModel,
}: ArchiverProps) => {
  const classes = useStyles();

  const { GCPProjectName } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [deleteDataset] = useMutation(DELETE_DATASET_MUTATION, {
    update(cache, { data }) {
      const { datasetId: analysisName } = data.deleteDataset;

      cache.modify({
        id: cache.identify({ __typename: 'Query' }),
        fields: {
          getDatasets(existingCommentRefs, { readField }) {
            return existingCommentRefs.filter(
              (commentRef: StoreObject) =>
                analysisName !== readField('analysisName', commentRef),
            );
          },
        },
      });
    },
  });

  const onSwitch = () => setOpen(!open);

  const onDelete = () => {
    onSwitch();
    resetDatasetModel();
    deleteDataset({
      variables: {
        GCPProjectName,
        datasetId,
      },
    });
  };

  return (
    <>
      <Link className={classes.link} component="button" onClick={onSwitch}>
        <Typography color="textPrimary" variant="body1">
          Archive
        </Typography>
      </Link>
      <AlertDialog
        open={open}
        title="You are about to delete this dataset."
        message="This action cannot be undone. Do you want to proceed?"
        actionButtonTitle="Delete"
        onAction={onDelete}
        onClose={onSwitch}
        type={AlertDialogType.DANGER}
      />
    </>
  );
};

export default Archiver;
