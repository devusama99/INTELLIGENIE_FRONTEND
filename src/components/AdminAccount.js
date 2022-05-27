import {
  Avatar,
  Button,
  TextField,
  CircularProgress,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import BoxContainerWhite from "./BoxContainerWhite";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      width: "90%",
      paddingLeft: theme.spacing(0),
    },
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: theme.palette.primary.main,
  },
  avatarText: {
    fontSize: "42px",
  },
  updateBtn: {
    marginTop: theme.spacing(2),
  },
  avatarContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: theme.spacing(4),
    },
  },
  input: { display: "none" },
  content: {
    display: "flex",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  formContainer: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0),
    },
  },
  forms: {
    borderLeft: `1px solid ${theme.palette.primary.light}`,
    [theme.breakpoints.down("sm")]: {
      border: "none",
      textAlign: "center",
    },
  },
  formHeading: {
    fontSize: "24px",
    marginBottom: theme.spacing(4),
  },
  formHeading2: {
    fontSize: "24px",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  inputFeild: {
    marginBottom: theme.spacing(3),
  },
}));

function AdminDashboard() {
  const classes = useStyles();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [disable, setDisable] = useState(false);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [passwordLoading, setPasswordLoading] = useState(false);

  function plotData() {
    const data = JSON.parse(localStorage.getItem("admin"));
    setValue("userEmail", data.userEmail);
    setValue("username", data.username);
  }
  function updateInformation(data) {
    setDisable(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "put",
      url: `${BACKEND}/userRouter/updateProfile`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setSnackData({
          message: "Information Updated Succesfully",
          type: "success",
          open: true,
        });
        console.log(JSON.stringify(response.data));
        localStorage.removeItem("admin");
        localStorage.setItem("admin", JSON.stringify(response.data));
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Updating Information",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }
  function updatePassword(data) {
    setPasswordLoading(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "put",
      url: `${BACKEND}/adminRouter/changePassword`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        ...data,
        username: JSON.parse(localStorage.getItem("admin")).username,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data !== "Invalid Password") {
          setSnackData({
            message: "Password Updated Succesfully",
            type: "success",
            open: true,
          });
          setValue1("oldPassword", "");
          setValue1("password", "");
          setValue1("confirmPassword", "");
          setPasswordLoading(false);
        } else {
          setSnackData({
            message: "Invalid Old Password",
            type: "error",
            open: true,
          });
          setValue1("oldPassword", "");
          setPasswordLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Updating Password",
          type: "error",
          open: true,
        });
        setPasswordLoading(false);
      });
  }
  useEffect(() => {
    plotData();
  }, []);
  return (
    <div className={classes.container}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <BoxContainerWhite>
        <div className={classes.content}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <span className={classes.avatarText}> A </span>
            </Avatar>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.updateBtn}
                disableElevation
              >
                Change Picture
              </Button>
            </label>
          </div>
          <div className={classes.forms}>
            <div className={classes.formContainer}>
              <Typography variant={"h5"} className={classes.formHeading}>
                Personal Information
              </Typography>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  // signIn(data);
                })}
              >
                <TextField
                  required
                  disabled
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
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Email"}
                  disabled
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
                  <Box className={classes.btnGroupLeft}>
                    {/* <Button
                      variant={"contained"}
                      disableElevation
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={disable}
                    >
                      Update Information
                      {disable ? <Progress size={20} /> : ""}
                    </Button> */}
                  </Box>
                </Box>
              </form>
            </div>
            <div className={classes.formContainer}>
              <Typography variant={"h5"} className={classes.formHeading2}>
                Change Password
              </Typography>
              <form
                noValidate
                onSubmit={handleSubmit1((data) => {
                  updatePassword(data);
                })}
                className={classes.passwordSection}
              >
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Old Password"}
                  className={classes.inputFeild}
                  name="oldPassword"
                  {...register1("oldPassword", {
                    required: "Password Required",
                    minLength: { value: 6, message: "Invalid Password" },
                  })}
                  type={"password"}
                  fullWidth
                  error={Boolean(errors1.password)}
                  helperText={errors1.password?.message}
                ></TextField>
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"New Password"}
                  className={classes.inputFeild}
                  name="password"
                  {...register1("password", {
                    required: "Password Required",
                    minLength: { value: 6, message: "Invalid Password" },
                  })}
                  type={"password"}
                  fullWidth
                  error={Boolean(errors1.password)}
                  helperText={errors1.password?.message}
                ></TextField>
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Confirm Password"}
                  className={classes.inputFeild}
                  name="confirmPassword"
                  {...register1("confirmPassword", {
                    required: "Confirm Password Required",
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  })}
                  type={"password"}
                  error={Boolean(errors1.confirmPassword)}
                  helperText={errors1.confirmPassword?.message}
                  fullWidth
                ></TextField>
                <Button
                  color="primary"
                  variant={"contained"}
                  type="submit"
                  disabled={passwordLoading}
                >
                  Update Password{" "}
                  {passwordLoading ? <Progress size={20} /> : ""}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </BoxContainerWhite>
    </div>
  );
}
export default AdminDashboard;
