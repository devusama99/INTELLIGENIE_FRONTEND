import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";
import axios from "axios";
import Snackbar from "./Snackbar";
import { useHistory } from "react-router-dom";

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
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  loginLink: {
    marginTop: theme.spacing(3),
  },
}));

function AdminSignup() {
  const classes = useStyles();

  const history = useHistory();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm();

  const [disable, setDisable] = useState(false);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const password = useRef({});
  password.current = watch("password", "");

  function signUp(data) {
    console.log(data);
    setSnackData({ ...snackData, open: false });
    setDisable(!disable);

    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/signUp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        if (res.data === "Admin Successfully Created") {
          setSnackData({
            message: "Admin Registered Successfuly",
            type: "success",
            open: true,
          });
          reset();
          setTimeout(() => {
            setSnackData({
              message: "",
              type: "",
              open: false,
            });

            history.push("/adminSignin");
          }, 5000);

          setDisable(false);
        } else {
          setSnackData({
            message: "Admin Username Already Registered",
            type: "error",
            open: true,
          });
          setValue("username", "");
          setDisable(false);
        }
        console.log(res);
      })
      .catch(function (error) {
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
            signUp(data);
          })}
        >
          <TextField
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            label={"Username"}
            name="username"
            className={classes.inputFeild}
            {...register("username", {
              required: "Username Required",
              pattern: {
                value: /^[a-zA-Z]+[a-zA-Z0-9_.-]{2,}$/,
                minLength: {
                  value: 6,
                  message: "Username can not be less than 3 characters",
                },
                message: "Invalid Username",
              },
            })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            fullWidth
          ></TextField>
          <TextField
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            label={"Email"}
            name="userEmail"
            className={classes.inputFeild}
            {...register("userEmail", {
              required: "Email required",
              pattern: {
                value:
                  /^[a-zA-Z]+[a-zA-Z0-9_.-]{1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/,
                message: "Invalid email",
              },
            })}
            error={Boolean(errors.userEmail)}
            helperText={errors.userEmail?.message}
            fullWidth
          ></TextField>

          <TextField
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            label={"Password"}
            className={classes.inputFeild}
            name="password"
            {...register("password", {
              required: "Password Required",
              minLength: { value: 6, message: "Invalid Password" },
            })}
            type={"password"}
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          ></TextField>
          <TextField
            variant={"outlined"}
            InputLabelProps={{ shrink: true }}
            size={"medium"}
            color={"primary"}
            label={"Confirm Password"}
            className={classes.inputFeild}
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password Required",
              validate: (value) =>
                value === password.current || "Passwords do not match",
            })}
            type={"password"}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            fullWidth
          ></TextField>
          <Box className={classes.btnGroup}>
            <Button
              variant={"contained"}
              color="primary"
              size="large"
              type="submit"
              disabled={disable}
              fullWidth
              disableElevation
              className={classes.btn}
            >
              Sign up
              {disable ? <Progress color="primary" size={20} /> : ""}
            </Button>
          </Box>
          <Typography
            variant={"body2"}
            component={"span"}
            className={classes.loginLink}
          >
            Alread Registered?{" "}
            <Link to={"/adminSignin"} className={classes.link}>
              Log In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
export default AdminSignup;
