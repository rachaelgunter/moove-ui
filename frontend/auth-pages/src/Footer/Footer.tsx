import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

interface FooterProps {
  children: ReactElement[];
}

const Footer = ({ children }: FooterProps): ReactElement => (
  <Grid container item justify="center" xs={12}>
    {children}
  </Grid>
);

export default Footer;
