import React, { FC, useState, ChangeEvent, useEffect } from 'react';

import {
  Breadcrumbs,
  makeStyles,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

interface PreviewSegmentBreadcrumbsProps {
  segment: string;
  onLoadSegment: (segment: string) => void;
}

const useStyles = makeStyles(() => ({
  breadcrumbs: {
    paddingLeft: '18px',
  },
  breadcrumbsItem: {
    lineHeight: '39px',
    width: 240,
  },
  id: {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: '0.7',
  },
  segment: {
    verticalAlign: 'middle',
  },
}));

const PreviewSegmentBreadcrumbs: FC<PreviewSegmentBreadcrumbsProps> = ({
  segment,
  onLoadSegment,
}: PreviewSegmentBreadcrumbsProps) => {
  const classes = useStyles();
  const [isDisabled, setDisabled] = useState(true);
  const [segmentId, setSegmentId] = useState(segment);

  useEffect(() => {
    setDisabled(segment === segmentId);
  }, [segment, segmentId]);

  const updateSegment = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSegmentId(e.currentTarget.value);
  };

  const onLoadSegmentValue = (value: string) => {
    onLoadSegment(value);
  };

  return (
    <Breadcrumbs className={classes.breadcrumbs} separator="">
      <Typography className={classes.id}>ID</Typography>
      <Typography
        component="div"
        className={classes.breadcrumbsItem}
        color="textPrimary"
      >
        <TextField
          className={classes.segment}
          fullWidth
          id="segment-id-value"
          value={segmentId}
          onChange={(e) => updateSegment(e)}
        />
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        disabled={isDisabled}
        onClick={() => onLoadSegmentValue(segmentId)}
      >
        Load
      </Button>
    </Breadcrumbs>
  );
};

export default PreviewSegmentBreadcrumbs;
