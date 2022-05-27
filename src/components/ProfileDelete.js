import {
  Avatar,
  makeStyles,
  Typography,
  Modal,
  Button,
  Fade,
  alpha,
  Backdrop,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ProfileTemplate from "./ProfileTemplate";
import BoxContainerWhite from "./BoxContainerWhite";
import { FaTrash as DeleteIcon, FaInfo as WarningIcon } from "react-icons/fa";
import { useState } from "react";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";
import { logout } from "./Helper/ClearLocalStorage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

const useStyle = makeStyles((theme) => ({
  deleteIcon: {
    backgroundColor: theme.palette.danger.main,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dangerHeading: {
    color: theme.palette.danger.main,
    marginLeft: theme.spacing(3),
    fontWeight: "bold",
  },

  contentPart1: {
    width: "40%",
    textAlign: "justify",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
  contentProminent: {
    marginTop: theme.spacing(2),
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: "16px",
  },
  contentPart2: {
    marginTop: theme.spacing(2),
    textAlign: "justify",
    width: "80%",
  },
  warningContentPart1: {
    width: "80%",
    textAlign: "justify",
  },
  checkBox: {
    marginTop: theme.spacing(2),
  },
  checkboxLabel: {
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  item1: {
    marginBottom: theme.spacing(5),
  },
  warningIcon: {
    backgroundColor: theme.palette.warning.main,
  },
  warningHeading: {
    color: theme.palette.warning.main,
    marginLeft: theme.spacing(3),
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: theme.palette.danger.main,
    boxShadow: "none",
    color: theme.palette.light.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.danger.main, 0.8),
    },
  },

  disableBtn: {
    marginTop: theme.spacing(2),
    display: "block",
    boxShadow: "none",
    color: theme.palette.light.main,
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.warning.main, 0.8),
    },
  },
  content: {
    width: "98.5%",
    boxSizing: "border-box",
    margin: theme.spacing(7),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  contentBox: {
    width: "100%",
    boxSizing: "border-box",
    margin: theme.spacing(4),
    marginLeft: theme.spacing(8),

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4),
      marginLeft: 0,
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  heading: {
    fontWeight: "bolder",
    color: theme.palette.danger.main,
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  ml3: {
    marginLeft: theme.spacing(3),
  },
  mt3: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    maxWidth:"800px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
  },
  btnGroup: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));
function ProfileDelete() {
  const history = useHistory()
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const classes = useStyle();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  // deleteconfirm 
  const [deleteUser, setDeleteUser] = useState(false);

  const deleteOpen = () => {
    setDeleteUser(true);
  };

  const deleteClose = () => {
    setDeleteUser(false);
  };
  function deleteProfile() {
    console.log(( JSON.parse(localStorage.getItem("user"))._id))
    setSnackData({ ...snackData, open: false });
    setDeleteLoading(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/userRouter/deleteUser${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response)
        setDeleteLoading(false);
        logout(history);
      })
      .catch(function (error) {
        console.log(error)
        setDeleteLoading(false);
        setSnackData({
          type: "error",
          message: "Error Deleting Account",
          open: true,
        });
      });
  }
  return (
    <div className={classes.content}>
      <BoxContainerWhite>
       <Modal
          aria-labelledby="Delete Sub User"
          aria-describedby="Delete Account of a sub user"
          className={classes.modal}
          open={deleteUser}
          onClose={deleteClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteUser}>
            <div className={classes.paper}>
              <div className={classes.modalForm}>
                <div className={classes.displayFlex}>
                  <Avatar className={classes.deleteIcon}>
                    <DeleteIcon />
                  </Avatar>
                  <Typography
                    variant={"h6"}
                    component={"h3"}
                    className={classes.dangerHeading}
                  >
                    Delete Account Permanently
                  </Typography>
                </div>
              </div>
              <div className={classes.contentBox}>
                <Typography variant="body2" className={classes.contentPart1}>
                  We are sorry to hear you’d like to delete your account.
                  Permenantly Delete data and all services from IntelliGenie.
                </Typography>
                <Typography variant={"h6"} className={classes.contentProminent}>
                  Keeping Your Data Safe
                </Typography>
                <Typography variant={"body2"} className={classes.contentPart2}>
                  Nothing is more important to us than the safety and security
                  of our community. People put their trust in us. So we will
                  never make any compromise when it comes to safeguarding your
                  data
                </Typography>

                <div className={classes.btnGroup}>
                  <Button
                    className={classes.deleteBtn}
                    variant="contained"
                    onClick={deleteProfile}
                    disabled={deleteLoading}
                  >
                    Delete Account{" "}
                    {deleteLoading ? <Progress color="primary" size={20} /> : ""}
                  </Button>
                  <Button
                    className={classes.ml3}
                    variant={"contained"}
                    onClick={deleteClose}
                    disableElevation
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
        <Snackbar
          open={snackData.open}
          type={snackData.type}
          message={snackData.message}
        />
        <Typography
          variant={"h5"}
          component={"h2"}
          className={[classes.heading, classes.dangerHeading]}
          gutterBottom
        >
          DELETE PROFILE
        </Typography>
        <div className={classes.item1}>
          <div className={classes.head}>
            <Avatar className={classes.deleteIcon}>
              <DeleteIcon />
            </Avatar>
            <Typography
              variant={"h6"}
              component={"h3"}
              className={classes.dangerHeading}
            >
              Delete Account Permanently
            </Typography>
          </div>
          <div className={classes.contentBox}>
            <Typography variant="body2" className={classes.contentPart1}>
              We are sorry to hear you’d like to delete your account.
              Permenantly Delete data and all services from IntelliGenie.
            </Typography>
            <Typography variant={"h6"} className={classes.contentProminent}>
              Keeping Your Data Safe
            </Typography>
            <Typography variant={"body2"} className={classes.contentPart2}>
              Nothing is more important to us than the safety and security of
              our community. People put their trust in us. So we will never make
              any compromise when it comes to safeguarding your data
            </Typography>
          
            <div>
              <Button
                variant="contained"
                disableElevation
                disabled={deleteLoading}
                style={{ marginTop: 20 }}
                className={classes.deleteBtn}
                onClick={deleteOpen}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </BoxContainerWhite>
    </div>
  );
}

export default ProfileDelete;
