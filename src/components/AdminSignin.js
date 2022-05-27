import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";
import axios from "axios";

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
    minWidth: "350px",
    maxWidth: "400px",
    borderRadius: theme.shape.borderRadius,
  },
  formHeading: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  inputFeild: {
    marginBottom: theme.spacing(2),
  },

  btn: {
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function AdminSignin() {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [disable, setDisable] = useState(false);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });
  function signIn(data) {
    console.log(data);
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/signIn`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        if (
          !(res.data === "Invalid Username" || res.data === "Invalid Password")
        ) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("admin", JSON.stringify(res.data.admin));
          history.push("/admin");
        } else {
          setSnackData({
            message: "Invalid Username or Password",
            type: "error",
            open: true,
          });
          setDisable(false);
        }
        console.log(res);
      })
      .catch(function (error) {
        console.log("Data Not Sent to Server!");
        setSnackData({
          message: "Something went wrong please try again",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }

  return (
    <div className={classes.container}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Card className={classes.formContainer}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.formHeading}
        >
          INTELLIGENIE ADMIN
        </Typography>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            signIn(data);
          })}
        >
          <TextField
            required
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            name="usename"
            label={"Username"}
            className={classes.inputFeild}
            fullWidth
            {...register("username", {
              required: "Username Required",
              pattern: {
                value: /^[a-zA-Z]+[a-zA-Z0-9_.-]{2,}$/,
                message: "Invalid Username",
              },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            required
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            label={"Password"}
            name="password"
            className={classes.inputFeild}
            type={"password"}
            fullWidth
            {...register("password", {
              required: "Password Required",
              minLength: { value: 6, message: "Invalid Password" },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          ></TextField>
          <Box className={classes.btnGroup}>
            <Box className={classes.btnGroupLeft}>
              <Link
                to={"/adminFogotPassword"}
                className={[classes.link, classes.forgotLink].join(" ")}
              >
                Forgot Password?
              </Link>
              <Button
                variant={"contained"}
                color="primary"
                size="large"
                type="submit"
                disabled={disable}
                fullWidth
                className={classes.btn}
              >
                Sign In
                {disable ? <Progress size={20} /> : ""}
              </Button>
            </Box>
          </Box>

          <Typography
            variant={"body2"}
            component={"span"}
            className={classes.loginLink}
          >
            Create an account?{" "}
            <Link to={"/adminSignup"} className={classes.link}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default AdminSignin;
