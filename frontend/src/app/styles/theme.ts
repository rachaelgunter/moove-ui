import { createMuiTheme, Theme } from '@material-ui/core';
import { Shadows } from '@material-ui/core/styles/shadows';

import { FontFamily } from './fonts';

declare module '@material-ui/core/styles/createPalette' {
  interface ColorOptions {
    600: string;
    lighter?: string;
    'dark-variant'?: string;
  }

  interface Palette {
    bg: Palette['primary'] & ColorOptions;
    notice: string;
    positive: string;
  }

  interface PaletteOptions {
    bg: PaletteOptions['primary'] & ColorOptions;
    notice: string;
    positive: string;
  }
}

const defaultTheme = createMuiTheme();

const buildShadows = (theme: Theme) => {
  const shadows = [...theme.shadows];

  shadows[2] = '0 2px 10px 0 rgba(0, 0, 0, 0.08)';

  return shadows as Shadows;
};

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: [FontFamily.POPPINS, FontFamily.ROBOTO, 'serif'].join(','),
    body1: {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
    },
    body2: {
      fontSize: 14,
    },
    subtitle1: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: 'normal',
      lineHeight: 'normal',
    },
  },
  palette: {
    notice: '#e88c4b',
    positive: '#58b080',
    bg: {
      600: '#474F55',
      lighter: '#37454d',
      light: '#303c43',
      main: '#182327',
      dark: '#222d33',
      'dark-variant': '#2c3f52',
    },
    primary: {
      main: '#29707f',
    },
    secondary: {
      light: '#39a7be',
      main: '#00b5ad',
      dark: '#29707f',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255,255, 0.5)',
    },
    action: {
      selected: '#235e5e',
    },
    background: {
      paper: '#303c43',
    },
  },
  shadows: buildShadows(defaultTheme),
});

export default theme;
