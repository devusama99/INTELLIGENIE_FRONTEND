import { Box, Typography, makeStyles, Button, alpha } from "@material-ui/core";
import {
  FiArrowLeft as BackIcon,
  FiArrowRight as NextIcon,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1.7),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  link: {
    textDecoration: "none",
  },
  btnIcon: {
    fontSize: "10px",
  },
  btnFootNav: {
    backgroundColor: theme.palette.green.light,
    "&:hover": {
      backgroundColor: alpha(theme.palette.green.light, 0.9),
    },
  },
  mid: {
    position: "relative",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hr: {
    border: `2px solid ${theme.palette.grey.main}`,
    backgroundColor: `${theme.palette.grey.main}`,
    borderRadius: theme.shape.borderRadius,
  },
  number: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.primary.main,
    height: "45px",
    borderRadius: "50%",
    width: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.light.main,
    border: `4px solid ${theme.palette.light.main}`,
  },
}));

function PageFoot(props) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Link to={props.backLink} className={classes.link}>
        <Button
          variant="contained"
          startIcon={<BackIcon className={classes.btnIcon} />}
          className={classes.btnFootNav}
          disabled={props.backDisabled}
        >
          Back
        </Button>
      </Link>
      <div className={classes.mid}>
        <hr className={classes.hr} />
        <div className={classes.number}>
          <Typography variant={"body2"}>{props.pageNo}</Typography>
        </div>
      </div>
      <Link to={props.nextLink} className={classes.link}>
        <Button
          variant="contained"
          endIcon={<NextIcon className={classes.btnIcon} />}
          className={classes.btnFootNav}
          disabled={props.nextDisabled}
        >
          Next
        </Button>
      </Link>
    </Box>
  );
}

export default PageFoot;
