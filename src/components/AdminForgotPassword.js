import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
  },
  formContainer: {
    padding: theme.spacing(5),
    minWidth: "350",
    width: "500",
    borderRadius: theme.shape.borderRadius,
  },
  formHeading: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
  btn: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function AdminForgotPassword() {
  const classes = useStyles();

  const [username, setUsername] = useState("");

  return (
    <div className={classes.container}>
      <Card className={classes.formContainer}>
        <form>
          <Typography
            variant="h6"
            color="primary"
            className={classes.formHeading}
          >
            FORGOT PASSWORD
          </Typography>

          <TextField
            variant="outlined"
            label={"Username"}
            value={username}
            className={classes.formItem}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />

          <Link to={"/adminSignIn"} className={classes.link}>
            <Button
              variant={"contained"}
              color={"primary"}
              fullWidth
              className={classes.btn}
              disableElevation
            >
              Search Admin
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}
export default AdminForgotPassword;
