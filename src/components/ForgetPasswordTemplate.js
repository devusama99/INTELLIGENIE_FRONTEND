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
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "./Snackbar";
import Progress from "./ButtonLoader";
import SignInUpTemplate from "./SignInUpTemplate";
import SignInImage from "./img/signIn.svg";
import ForgetPassword from "./ForgetPassword";

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
    },
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      height: "100%",
      justifyContent: "flex-start",
    },
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5),
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  signupImage: {
    width: "100%",
    marginTop: theme.spacing(2),
    transform: "scale(0.7)",
  },
  inputFeild: {
    marginBottom: theme.spacing(3),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
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
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      minWidth: "0%",
      marginTop: theme.spacing(2),
    },
  },
  loginLink: {
    alignSelf: "flex-start",
    marginTop: theme.spacing(3),
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.dark.main,
  },
  btnGroupLeft: {
    display: "flex",
    flexDirection: "column",
  },
  forgotLink: {
    marginTop: theme.spacing(2),
    alignSelf: "flex-start",
  },
  link: {
    textDecoration: "none",
  },
  anchorTag: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function ForgetPasswordTemplate() {
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

  function ForgetPasswordTemplate(data) {
    console.log(data);
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/ForgetPasswordTemplate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        if (res.data.message === "Logged In Successfully") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          history.push("/app/blogTitle");
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
    <SignInUpTemplate>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Grid item xs={12} md={6}>
        <Box className={classes.imgContainer}>
          <Typography
            variant={"h4"}
            component={"h1"}
            gutterBottom
            className={classes.heading}
          >
            Forgot Password
          </Typography>
          <Typography
            variant={"body2"}
            component={"p"}
            className={classes.tagline}
          >
            Reset your password and start working now
          </Typography>
          <img src={SignInImage} alt="Signup" className={classes.signupImage} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ForgetPassword />
        </div>
      </Grid>
    </SignInUpTemplate>
  );
}

export default ForgetPasswordTemplate;
