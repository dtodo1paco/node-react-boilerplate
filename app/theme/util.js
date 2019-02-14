import { createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme();
export const createTheme = (id, type, colors) =>
  createMuiTheme({
    props: {
      id,
    },
    palette: createPalette({
      type,
      background: colors.background,
      text: colors.textColor,
      primary: colors.primaryColor,
      secondary: colors.secondaryColor,
      error: colors.error,
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      status: {
        danger: colors.primaryColor,
      },
    }),
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: colors.background.component.secondary,
        },
      },
      MuiButton: {
        textSecondary: {
          '&:hover': {
            backgroundColor: colors.secondaryColor.dark,
          },
        },
        outlined: {
          backgroundColor: colors.background.paper,
          color: colors.primaryColor.dark,
          '&:hover': {
            backgroundColor: colors.primaryColor.dark,
            color: colors.background.paper,
          },
        },
      },
      MuiButtonBase: {
        root: {
          verticalAlign: 'text-top',
        },
      },
      MuiFormControl: {
        root: {
          margin: theme.spacing.unit,
          minWidth: 120,
          maxWidth: 240,
        },
      },
      MuiFormGroup: {
        root: {
          backgroundColor: colors.background.component.secondary,
          color: colors.primaryColor,
          padding: '2rem',
        },
      },
      MuiFormLabel: {
        root: {
          color: colors.secondaryColor.dark,
        },
      },
      MuiFormHelperText: {
        root: {
          [theme.breakpoints.down('sm')]: {
            fontSize: 'x-small',
          },
        },
      },
      MuiInput: {
        input: {
          color: colors.primaryColor.light,
        },
      },
      MuiList: {
        root: {
          margin: 'inherit',
          '&:focus': {
            outlineColor: colors.secondaryColor.dark,
          },
        },
        padding: {
          paddingBottom: 0,
        },
      },
      MuiListItemIcon: {
        root: {
          color: colors.primaryColor.main,
        },
      },
      MuiListItemText: {
        root: {
          padding: 0,
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: colors.background.component.secondary,
          '&:focus': {
            outlineColor: 'inherit',
          },
        },
      },
      MuiPopover: {
        paper: {
          color: colors.primaryColor.light,
        },
      },
      MuiSelect: {
        select: {
          color: colors.secondaryColor.light,
        },
      },
      MuiSnackbarContent: {
        message: {
          maxWidth: '85%',
        },
      },
      MuiSvgIcon: {
        root: {
          color: colors.primaryColor.main,
        },
      },
      MuiTableCell: {
        root: {
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit,
          },
        },
      },
      MuiToolbar: {
        regular: {
          minHeight: 'unset',
          [theme.breakpoints.down('xl')]: {
            minHeight: 'unset',
          },
        },
      },
      MuiTypography: {
        headline: {
          fontSize: 24,
          color: colors.primaryColor.main,
          outline: 'none',
        },
        title: {
          fontSize: 20,
          color: colors.primaryColor.main,
          outline: 'none',
        },
        subheading: {
          fontSize: 12,
          outline: 'none',
        },
        display1: {
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 8,
          outline: 'none',
        },
        display2: {
          fontSize: 20,
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
          marginBottom: 8,
          outline: 'none',
          '& @media (max-width: 600px)': {
            fontSize: theme.typography.pxToRem(12),
          },
        },
        display3: {
          fontSize: 16,
          outline: 'none',
          textAlign: 'center',
          marginBottom: 8,
        },
        display4: {
          fontSize: 8,
          outline: 'none',
          margin: `${theme.spacing.unit}px auto`,
          '&:focus': {
            outlineColor: 'inherit',
          },
        },
      },
    },
  });
