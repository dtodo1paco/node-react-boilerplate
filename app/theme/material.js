import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';

export const colors = {
  background: {
    paper: blueGrey[300],
    default: blueGrey[100],
    component: {
      primary: blueGrey[300],
      secondary: blueGrey[100],
    },
  },
  foreground: {
    text: teal[400],
  },
  error: red,
  primaryColor: {
    main: teal[700],
    light: teal[500],
    dark: teal[900],
  },
  secondaryColor: {
    main: blueGrey[700],
    light: blueGrey[500],
    dark: blueGrey[900],
  },
};
colors.textColor = {
  primary: colors.secondaryColor.dark,
  secondary: colors.primaryColor.dark,
  disabled: grey[200],
  hint: grey[800],
};

export default colors;
