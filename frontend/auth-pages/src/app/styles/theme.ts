import { createMuiTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
  interface ColorOptions {
    lighter?: string;
    'dark-variant'?: string;
  }

  interface Palette {
    bg: Palette['primary'] & ColorOptions;
  }

  interface PaletteOptions {
    bg: PaletteOptions['primary'] & ColorOptions;
  }
}

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: ['Poppins', 'serif', 'Roboto'].join(','),
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
  },
  palette: {
    bg: {
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
  },
  overrides: {
    MuiList: {
      root: {
        background: '#303c43',
      },
    },
    MuiMenuItem: {
      root: {
        background: '#303c43',
        fontFamily: 'Roboto',
      },
    },
  },
});

export default theme;
