import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';

export const colors = {
  background: {
    paper: '#212121',
    default: '#202020',
    component: {
      primary: grey[300],
      secondary: blueGrey[900],
    },
  },
  foreground: {
    text: '#e0e0e0',
  },
  error: red,
  primaryColor: {
    main: '#CDDC39',
    light: lightGreen[300],
    dark: lightGreen[500],
  },
  secondaryColor: {
    main: '#b0bec5',
    light: blueGrey[300],
    dark: blueGrey[700],
  },
};
colors.textColor = {
  primary: colors.secondaryColor.light,
  secondary: colors.primaryColor.light,
  disabled: grey[200],
  hint: grey[800],
};

export default colors;
