import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
const theme = createMuiTheme({
  direction: "rtl",
  overrides: {
    MuiInputLabel: {
      formControl: {
        right: 0,
        top: 0,
        left: "none",
      },
    },
    MuiTypography: { displayBlock: { textAlign: "right", fontSize: "1.4rem" } },
  },
  palette: {
    primary: green,
  },
});

export default theme;
