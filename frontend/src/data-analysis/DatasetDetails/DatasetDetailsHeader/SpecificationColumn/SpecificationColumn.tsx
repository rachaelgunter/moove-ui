import React from 'react';
import { Grid } from '@material-ui/core';

import Typography from 'src/shared/Typography';
import { FontFamily } from 'src/app/styles/fonts';

interface SpecificationColumnProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const SpecificationColumn: React.FC<SpecificationColumnProps> = ({
  title,
  id,
  children,
}: SpecificationColumnProps) => {
  return (
    <Grid item container spacing={1} direction="column" id={id}>
      <Grid item>
        <Typography
          variant="caption"
          color="textSecondary"
          fontFamily={FontFamily.ROBOTO}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default SpecificationColumn;
