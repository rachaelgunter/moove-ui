import { createMuiTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
  interface ColorOptions {
    lighter?: string;
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
    fontFamily: ['Poppins', 'serif'].join(','),
    body2: {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
    },
  },
  palette: {
    bg: {
      lighter: '#37454d',
      light: '#303c43',
      main: '#182327',
      dark: '#222d33',
    },
    secondary: {
      main: '#00b5ad',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255,255, 0.5)',
    },
  },
});

export default theme;
