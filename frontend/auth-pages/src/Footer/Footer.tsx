import React, { ReactElement } from 'react';
import { Grid, GridJustification } from '@material-ui/core';

interface FooterProps {
  children: ReactElement | ReactElement[];
  justify?: GridJustification;
}

const Footer = ({
  children,
  justify = 'center',
}: FooterProps): ReactElement => (
  <Grid container item justify={justify} xs={12}>
    {children}
  </Grid>
);

Footer.defaultProps = {
  justify: 'center',
};

export default Footer;
