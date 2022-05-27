import { Avatar, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "./Snackbar";
import Progress from "./ButtonLoader";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "80px",
    height: "80px",
  },
  changeImgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(8),
  },
  marginLeft: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "8px 9px 25px rgba(0, 0, 0, 0.06)",
    border: `1px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.light.main,
    width: "48%",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
      width: "100%",
    },
  },
  input: {
    display: "none",
  },
  changePhotoBtn: {
    backgroundImage: "linear-gradient(95.47deg, #0067B1 0.51%, #008181 99.64%)",
    boxShadow:
      "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    marginLeft: theme.spacing(2),
  },

  updateBtns: {
    backgroundImage: "linear-gradient(95.47deg, #0067B1 0.51%, #008181 99.64%)",
    boxShadow:
      "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    color: theme.palette.light.main,
  },
  formHeading: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(6),
    textAlign: "center",
  },
  inputFeild: {
    marginBottom: theme.spacing(4),
  },
  content: {
    width: "98.5%",
    boxSizing: "border-box",
    margin: theme.spacing(7),

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4),
    },
  },
  gridItem: {
    padding: 0,
  },
  container: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

function ProfileUpdate() {
  const classes = useStyles();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  function updatePassword(data) {
    setPasswordLoading(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "put",
      url: `${BACKEND}/userRouter/changePassword`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        ...data,
        username: JSON.parse(localStorage.getItem("user")).username,
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

  function updateInformation(data) {
    setInfoLoading(true);
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
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        setInfoLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Updating Information",
          type: "error",
          open: true,
        });
        setInfoLoading(false);
      });
  }

  function plotData(data) {
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("username", data.username);
    setValue("userEmail", data.userEmail);
  }
  useEffect(() => {
    plotData(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <div className={classes.content}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <div className={classes.changeImgContainer}>
        <Avatar
          src={JSON.parse(localStorage.getItem("user")).profilePicture}
          className={classes.avatar}
        ></Avatar>
        <span>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ marginLeft: 10 }}
              disableElevation
            >
              Change Picture
            </Button>
          </label>
        </span>
      </div>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <Typography variant={"h5"} className={classes.formHeading}>
            Personal Information
          </Typography>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              updateInformation(data);
            })}
          >
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              label={"First Name"}
              name="firstName"
              className={classes.inputFeild}
              {...register("firstName", {
                required: "First name required",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Invalid first name",
                },
              })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              fullWidth
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              label={"Last Name"}
              className={classes.inputFeild}
              name="lastName"
              {...register("lastName", {
                required: "Last name required",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Invalid last name",
                },
              })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
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
              label={"Username"}
              name="username"
              disabled
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
            <Button
              color="primary"
              variant={"contained"}
              disabled={infoLoading}
              type="submit"
            >
              Update Information
              {infoLoading ? <Progress size={20} /> : ""}
            </Button>
          </form>
        </div>
        <div className={[classes.formContainer, classes.marginLeft].join(" ")}>
          <Typography variant={"h5"} className={classes.formHeading}>
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
              Update Password {passwordLoading ? <Progress size={20} /> : ""}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
