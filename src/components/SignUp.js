import {
  Box,
  makeStyles,
  TextField,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  FaFacebookF as Facebook,
  FaGoogle as Google,
  FaTwitter as Twitter,
  FaGithub as GitHub,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "./Snackbar";
import Progress from "./ButtonLoader";
import SignInUpTemplate from "./SignInUpTemplate";
import SignupImage from "./img/signUp.svg";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    backgroundImage:
      "radial-gradient(50% 50% at 50% 50%, rgba(127, 191, 191, 0.41) 0%, #82C2C2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(5),
      paddingTop: theme.spacing(5),
    },
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  signupImage: {
    width: "100%",
    marginTop: theme.spacing(2),
    transform: "scale(0.8)",
  },
  inputFeild: {
    marginBottom: theme.spacing(3),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  },
  signupBtn: {
    backgroundImage: "linear-gradient(92.61deg, #0067B1 0%, #008080 100%)",
    boxShadow: "3px 4px 8px 1px rgba(0, 0, 0, 0.15)",
    color: theme.palette.light.main,
  },
  iconButton: {
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
  icon: {
    border: 0,
    color: theme.palette.primary.main,
    fontSize: theme.iconBtn.size,
  },
  colorDark: {
    color: theme.palette.dark.main,
  },
  tagline: {
    color: theme.palette.dark.main,
    textAlign: "center",
  },
  socialGroup: {
    minWidth: "40%",
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      minWidth: "0%",
      marginTop: theme.spacing(2),
    },
  },
  loginLink: {
    alignSelf: "flex-start",
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.dark.main,
  },
  anchorTag: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function SignUp() {
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
      url: `${BACKEND}/userRouter/signUp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        if (res.data === "User Successfully Created") {
          setSnackData({
            message: "User Registered Successfuly",
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

            history.push("/signIn");
          }, 5000);

          setDisable(false);
        } else {
          setSnackData({
            message: "User Already Registered",
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
    <SignInUpTemplate>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />

      <Grid item xs={12} md={6}>
        <div className={classes.imgContainer}>
          <Typography
            variant={"h4"}
            component={"h1"}
            gutterBottom
            className={classes.heading}
          >
            Sign Up
          </Typography>
          <Typography
            variant={"body2"}
            component={"p"}
            className={classes.tagline}
          >
            Create an account to start using IntelliGenie services
          </Typography>
          <img src={SignupImage} alt="Signup" className={classes.signupImage} />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className={classes.formContainer}>
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
              >
                Sign up
                {disable ? <Progress color="primary" size={20} /> : ""}
              </Button>
              {/* <Box className={classes.socialGroup}>
                <IconButton
                  aria-label={"Login with Facebook"}
                  className={classes.iconButton}
                >
                  <Facebook className={classes.icon} />
                </IconButton>
                <IconButton
                  aria-label={"Login with Google"}
                  className={classes.iconButton}
                >
                  <Google className={classes.icon} />
                </IconButton>
                <IconButton
                  aria-label={"Login with Twitter"}
                  className={classes.iconButton}
                >
                  <Twitter className={classes.icon} />
                </IconButton>
                <IconButton
                  aria-label={"Login with GitHub"}
                  className={classes.iconButton}
                >
                  <GitHub className={classes.icon} />
                </IconButton>
              </Box> */}
            </Box>
            <Typography
              variant={"body2"}
              component={"span"}
              className={classes.loginLink}
            >
              Alread Registered?{" "}
              <Link to={"/signin"} className={classes.anchorTag}>
                Log In
              </Link>
            </Typography>
          </form>
        </Box>
      </Grid>
    </SignInUpTemplate>
  );
}

export default SignUp;
