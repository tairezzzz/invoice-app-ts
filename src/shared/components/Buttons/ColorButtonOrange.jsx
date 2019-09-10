import { withStyles } from "@material-ui/core";
import { orange, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const ColorButtonOrange = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: orange[300],
    '&:hover': {
      backgroundColor: orange[600],
    },
  },
}))(Button);

export default ColorButtonOrange;