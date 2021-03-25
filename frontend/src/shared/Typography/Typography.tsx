import React from 'react';
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { FontFamily } from 'src/app/styles/fonts';

export interface TypographyProps extends MuiTypographyProps {
  fontFamily?: FontFamily;
}

interface StyleProps {
  fontFamily: FontFamily;
}

const useStyles = makeStyles<Theme, StyleProps, string>({
  root: ({ fontFamily }: StyleProps) => ({
    fontFamily,
  }),
});

const Typography: React.FC<TypographyProps> = ({
  fontFamily = FontFamily.POPPINS,
  children,
  ...otherProps
}: TypographyProps) => {
  const classes = useStyles({ fontFamily });

  return (
    <MuiTypography
      classes={{
        root: classes.root,
      }}
      {...otherProps}
    >
      {children}
    </MuiTypography>
  );
};

Typography.defaultProps = {
  fontFamily: FontFamily.POPPINS,
};

export default Typography;
