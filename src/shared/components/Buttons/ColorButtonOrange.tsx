import { withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const ColorButtonOrange = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[800]),
    backgroundColor: orange[300],
    '&:hover': {
      backgroundColor: orange[600],
    },
  },
}))(Button);

export default ColorButtonOrange;