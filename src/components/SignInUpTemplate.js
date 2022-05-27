import { Box, Container, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";

const useStyles = makeStyles((theme) => ({
  box: {
    boxShadow: "5px 4px 44px -7px rgba(0, 0, 0, 0.13)",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
  container: {
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(2.5),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(6),
    },
  },
}));

function SignInUpTemplate(props) {
  const classes = useStyles();
  return (
    <>
      <Appbar />
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.box}>
          <Grid container>{props.children}</Grid>
        </Box>
      </Container>
    </>
  );
}

export default SignInUpTemplate;
