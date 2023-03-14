import { createTheme } from '@mui/material';

const paletteColor = {
  primary: {
    main: '#f7df1e',
    light: '##f8e246',
    dark: '###f5cb19',
    contrastText: '#000',
  },
  secondary: {
    main: '#434343',
    light: '#555555',
    dark: '#262626',
  },
};

export const theme = createTheme({
  palette: {
    primary: paletteColor.primary,
    secondary: paletteColor.secondary,
  },
});
