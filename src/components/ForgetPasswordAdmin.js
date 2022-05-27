import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TextField, Box } from "@material-ui/core";
import SignInUpTemplate from "./SignInUpTemplate";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";
import { useRef } from "react";
import axios from "axios";
import Snackbar from "./Snackbar";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  color: {
    backgroundColor: "#F2F8F8",
  },

  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  inputFeild: {
    maxWidth: 400,
    marginTop: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: "100%",
  },
  passwordSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

function getSteps() {
  return ["Verify Email", "Verify OTP", "Change Password"];
}

export default function ForgetPasswordAdmin() {
  const classes = useStyles();
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              forgetPassword(data);
            })}
          >
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
            <Box className={classes.btnGroup}>
              <Box className={classes.button}>
                <Button
                  variant={"contained"}
                  disableElevation
                  color="primary"
                  type="submit"
                  size="medium"
                  disabled={disable}
                >
                  Verify Email
                  {disable ? <Progress size={20} /> : ""}
                </Button>
              </Box>
            </Box>
          </form>
        );
      case 1:
        return (
          <form
            noValidate
            onSubmit={handleSubmit1((data) => {
              verifyOTP(data);
            })}
          >
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              label={"OTP"}
              name="otp"
              className={classes.inputFeild}
              {...register1("otp", {
                required: "OTP required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Invalid OTP",
                },
              })}
              error={Boolean(errors1.otp)}
              helperText={errors1.otp?.message}
              fullWidth
            ></TextField>
            <Box className={classes.btnGroup}>
              <Box className={classes.button}>
                <Button
                  variant={"contained"}
                  disableElevation
                  color="primary"
                  type="submit"
                  size="medium"
                  disabled={disable}
                >
                  Verify OTP
                  {disable ? <Progress size={20} /> : ""}
                </Button>
              </Box>
            </Box>
          </form>
        );
      case 2:
        return (
          <form
            noValidate
            onSubmit={handleSubmit2((data) => {
              updatePassword(data);
            })}
            className={classes.passwordSection}
          >
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              label={"New Password"}
              className={classes.inputFeild}
              name="password"
              {...register2("password", {
                required: "Password Required",
                minLength: { value: 6, message: "Invalid Password" },
              })}
              type={"password"}
              fullWidth
              error={Boolean(errors2.password)}
              helperText={errors2.password?.message}
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              label={"Confirm Password"}
              className={classes.inputFeild}
              name="confirmPassword"
              {...register2("confirmPassword", {
                required: "Confirm Password Required",
                validate: (value) =>
                  value === password.current || "Passwords do not match",
              })}
              type={"password"}
              error={Boolean(errors2.confirmPassword)}
              helperText={errors2.confirmPassword?.message}
              fullWidth
            ></TextField>
            <Button
              color="primary"
              variant={"contained"}
              type="submit"
              size="medium"
              disabled={disable}
              className={classes.button}
            >
              Update Password {disable ? <Progress size={20} /> : ""}
            </Button>
          </form>
        );
      default:
        return "Unknown step";
    }
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    watch,
    setValue: setValue1,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [disable, setDisable] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const history = useHistory();

  const { REACT_APP_BACKEND: BACKEND } = process.env;

  const [username, setUsername] = useState("");

  function forgetPassword(data) {
    console.log(data);
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/forgetPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data.message == "OTP Send to Your Email") {
          handleNext();
          console.log(response.data.data[0].username);
          setUsername(response.data.data[0].username);
          setDisable(false);
        } else {
          setValue("userEmail", "");
          setDisable(false);
          setSnackData({
            message: "Error Verifying Email",
            type: "error",
            open: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
      });
  }

  function verifyOTP(data) {
    console.log(data);
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/verifyOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data == "OTP Matched") {
          handleNext();
          setDisable(false);
        } else {
          setValue("otp", "");
          setSnackData({
            message: "OTP Not Matched",
            type: "error",
            open: true,
          });
          setDisable(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
      });
  }

  function updatePassword(data) {
    setDisable(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/updatePassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...data,
        username: username,
      },
    };
    console.log({
      ...data,
      username: username,
    });
    axios(config)
      .then(function (response) {
        if (response.data !== "Invalid Password") {
          setSnackData({
            message: "Password Updated Succesfully",
            type: "success",
            open: true,
          });
          setValue1("password", "");
          setValue1("confirmPassword", "");
          setDisable(false);
          setTimeout(() => {
            history.push("/signin");
          }, 5000);
        } else {
          setSnackData({
            message: "Error Updating Password",
            type: "error",
            open: true,
          });
          setValue1("oldPassword", "");
          setDisable(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Updating Password",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        classes={{
          root: classes.color,
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent className={classes.content}>
              <div>{getStepContent(index)}</div>

              <Link
                to="/adminSignin"
                style={{
                  textDecoration: "none",
                  color: "#015A59",
                  marginLeft: "3px",
                }}
              >
                Sign In?
              </Link>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
