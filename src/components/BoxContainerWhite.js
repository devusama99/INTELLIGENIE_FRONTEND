import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  boxWhite: {
    boxShadow: "8px 9px 25px rgba(0, 0, 0, 0.06)",
    border: `1px solid ${theme.palette.primary.light}`,
    backgroundColor: "#FAFCFC",
    padding: theme.spacing(7),

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(7),
    },

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },

    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },
}));

function BoxContainerWhite(props) {
  const classes = useStyles();
  return <Box className={classes.boxWhite}>{props.children}</Box>;
}
export default BoxContainerWhite;
