import { makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as UploadIcon } from 'src/assets/icons/upload-to-cloud.svg';

interface DropzoneProps {
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
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Dropzone: FC<DropzoneProps> = ({ onDrop }: DropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const classes = useStyles();

  const updateFiles = (updated: File[]) => {
    setFiles(updated);
    onDrop(updated);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: '.csv',
    onDrop: updateFiles,
  });

  return (
    <div className={classes.dropzoneContainer}>
      {files.length ? (
        <div>
          <ul>
            {files.map((file) => (
              <>
                <li key={file.name}>
                  {file.name} - {file.size} bytes
                </li>
                <button type="button" onClick={() => updateFiles([])}>
                  Remove
                </button>
              </>
            ))}
          </ul>
        </div>
      ) : (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <UploadIcon />
          <Typography component="div">
            Drag and drop here or click to browse
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
