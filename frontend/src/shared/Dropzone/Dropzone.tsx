import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as UploadIcon } from 'src/assets/icons/upload-to-cloud.svg';

interface DropzoneProps {
  files: File[];
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  dropzoneContainer: {
    height: '100%',
  },
  dropzone: {
    background: theme.palette.bg.lighter,
    border: '2px dashed',
    height: '100%',
    width: '100%',
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropzoneHint: {
    marginTop: '20px',
  },
  fileRemoveButton: {
    marginLeft: '20px',
    borderColor: '#fff',
  },
}));

const Dropzone: FC<DropzoneProps> = ({ onDrop, files }: DropzoneProps) => {
  const classes = useStyles();

  const updateFiles = (updated: File[]) => {
    onDrop(updated);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: '.csv',
    onDrop: updateFiles,
  });

  const getFileSize = (file: File): string => {
    return `${Math.round((file.size / Math.pow(2, 20)) * 1e4) / 1e4} MB`;
  };

  return (
    <div className={classes.dropzoneContainer}>
      {files.length ? (
        <div>
          {files.map((file) => (
            <div key={file.name}>
              {file.name} - {getFileSize(file)}
              <Button
                className={classes.fileRemoveButton}
                variant="outlined"
                type="button"
                onClick={() => updateFiles([])}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <UploadIcon />
          <Typography className={classes.dropzoneHint} component="div">
            Drag and drop here or click to browse
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
