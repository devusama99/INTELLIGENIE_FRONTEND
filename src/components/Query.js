import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  alpha,
  Modal,
  Backdrop,
  Fade,
  Avatar,
} from "@material-ui/core";
import { MdDelete, MdEdit } from "react-icons/md";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import Snackbar from "./Snackbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    boxSizing: "border-box",
    margin: theme.spacing(7),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
  ratingFeedbackHead: {
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  complaintCard: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    boxSizing: "border-box",
    boxShadow: "none",
    border: `1px solid ${theme.palette.primary.light}`,
    width: "98.5%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      padding: theme.spacing(3),
    },
  },
  catagoryHeading: {
    fontSize: "14px",
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    color: theme.palette.dark.main,
  },

  complaintHeading: {
    color: theme.palette.dark.main,
    fontSize: "14px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    backgroundImage: `linear-gradient(95.47deg, ${theme.palette.secondary.main} 0%,  ${theme.palette.primary.main} 100%)`,
    color: theme.palette.light.main,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  complainCategory: {
    marginTop: theme.spacing(1),
  },
  content: {
    width: "100%",
    boxSizing: "border-box",
    margin: theme.spacing(7),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
  ratingFeedbackHead: {
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  ratingFeedbackCard: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    boxSizing: "border-box",
    boxShadow: "none",
    border: `1px solid ${theme.palette.primary.light}`,
    width: "98.5%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      padding: theme.spacing(3),
    },
  },
  ratingHeading: {
    fontSize: "14px",
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    color: theme.palette.dark.main,
  },
  ratingStars: {
    transform: "scale(1.5)",
  },
  feedbackHeading: {
    color: theme.palette.dark.main,
    fontSize: "14px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    color: theme.palette.light.main,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  ratingsFeedbacksHeading: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  editRatingsFeedbacksHeading: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  ratingsFeedbacksContainer: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },
  feedbackCard: {
    flexGrow: 1,
    minHeight: "200px",
    boxShadow: "none",
    margin: theme.spacing(1),
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.primary.light}`,
  },
  cardName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  cardRating: {
    marginTop: theme.spacing(1),
  },
  cardFeedback: {
    marginTop: theme.spacing(1),
  },
  cardTag: {
    display: "inline-block",
    fontWeight: "bold",
    fontFamily: "Cookie, cursive",
    fontSize: "20px",
    marginTop: theme.spacing(2),
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundSize: "100%",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozTextFillColor: "transparent",
  },
  dFlexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },

  ml3: {
    marginLeft: theme.spacing(3),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  modalForm: {
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    backgroundColor: theme.palette.danger.main,
  },
  btnDanger: {
    backgroundColor: theme.palette.danger.main,
    color: theme.palette.light.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.danger.main, 0.8),
    },
    "&:disable": {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  displayFlexCenter: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  dangerHeading: {
    marginLeft: theme.spacing(1),
  },
  contentPart1: {
    marginBottom: theme.spacing(2),
  },
  reply: {
    backgroundColor: "#f7f7f7",
    marginTop: theme.spacing(2),
  },
  p2: {
    padding: theme.spacing(1),
  },
}));

function Query() {
  const classes = useStyles();

  const [actionID, setActionID] = useState("");
  const [disable, setDisable] = useState(false);

  const { REACT_APP_BACKEND: BACKEND } = process.env;

  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const [myComplaints, setMyComplaints] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [actionDisable, setActionDisable] = useState(false);

  //   Edit Complaint Modal methods
  const [editComplaint, seteditComplaint] = useState(false);

  const editOpen = () => {
    seteditComplaint(true);
  };

  const editClose = () => {
    seteditComplaint(false);
  };

  const [deleteComplaint, setdeleteComplaint] = useState(false);

  const deleteOpen = () => {
    setdeleteComplaint(true);
  };

  const deleteClose = () => {
    setdeleteComplaint(false);
  };

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue,
  } = useForm();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function getmyComplaints() {
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewAllQueries${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data !== "No Queries Available.")
          setMyComplaints(response.data);
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          type: "error",
          message: "Error getting Queries",
          open: true,
        });
      });
  }

  function postComplaint(data) {
    console.log(data);
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/postQuery${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        description: data.complaint,
      },
    };

    axios(config)
      .then(function (response) {
        setMyComplaints([response.data, ...myComplaints]);
        setDisable(false);
        setSnackData({
          type: "success",
          message: "Query posted successfully",
          open: true,
        });
        reset();
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error posting Query",
          open: true,
        });
      });
  }

  function updateComplaint(data) {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setActionDisable(true);
    var config = {
      method: "put",
      url: `${BACKEND}/userRouter/updateQuery${actionID}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        description: data.complaint,
      },
    };

    axios(config)
      .then(function (response) {
        setMyComplaints(
          myComplaints.map((ele) =>
            ele._id == actionID ? { ...ele, description: data.complaint } : ele
          )
        );
        setActionDisable(false);
        setSnackData({
          type: "success",
          message: "Query updated successfully",
          open: true,
        });
        reset();
        editClose();
      })
      .catch(function (error) {
        console.log(error);
        setActionDisable(false);
        setSnackData({
          type: "error",
          message: "Error updating Query",
          open: true,
        });
      });
  }

  function removeComplaint() {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setActionDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/userRouter/deleteQuery${actionID}/user${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setMyComplaints(myComplaints.filter((ele) => ele._id !== actionID));
        setActionDisable(false);
        setSnackData({
          type: "success",
          message: "Query Deleted successfully",
          open: true,
        });
        deleteClose();
      })
      .catch(function (error) {
        console.log(error);
        setActionDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting Query",
          open: true,
        });
      });
  }

  useEffect(() => {
    getmyComplaints();
  }, []);

  return (
    <div className={classes.content}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Typography variant="h6" component={"h1"} className={classes.heading}>
        QUERY AND RESPONSES
      </Typography>
      <Typography
        variant="h6"
        component={"h2"}
        className={classes.ratingFeedbackHead}
      >
        Your Query
      </Typography>
      <Card className={classes.complaintCard}>
        <Typography
          variant="h6"
          component={"h6"}
          className={classes.complaintHeading}
        >
          Query Detail
        </Typography>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            postComplaint(data);
          })}
        >
          <TextField
            variant={"outlined"}
            multiline
            fullWidth
            rows={8}
            InputLabelProps={{ shrink: true }}
            {...register("complaint", {
              required: "Complaint Detail Required",
              pattern: {
                value: /^[a-zA-Z0-9_. -]{2,}$/m,
                message: "Invalid ComplaintDetail",
              },
            })}
            error={Boolean(errors.complaint)}
            helperText={errors.complaint?.message}
          />
          <div className={classes.dFlexBetween}>
            <Button
              className={classes.submitBtn}
              variant={"contained"}
              type="submit"
              disableElevation
              disabled={disable}
              color={"primary"}
            >
              Submit Query
              {disable ? <Progress color="primary" size={20} /> : ""}
            </Button>
          </div>
        </form>
      </Card>
      <Typography
        variant="h6"
        component={"h2"}
        className={classes.ratingsFeedbacksHeading}
      >
        Your Queries
      </Typography>
      <div className={classes.ratingsFeedbacksContainer}>
        {myComplaints.length > 0 ? (
          myComplaints.map((ele, i) => {
            return (
              <Card className={classes.feedbackCard} key={"complaint-" + i}>
                <div className={classes.dFlexBetween}>
                  <div>
                    <Typography
                      variant="h6"
                      component={"h3"}
                      className={classes.cardName}
                    >
                      {ele.userFullName}
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => {
                        setActionID(ele._id);
                        setValue("complaint", ele.description);
                        editOpen();
                      }}
                    >
                      <MdEdit color="primary" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="delete"
                      onClick={() => {
                        setActionID(ele._id);
                        deleteOpen();
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </div>
                <Typography
                  variant="body1"
                  component="h6"
                  className={classes.cardFeedback}
                >
                  {ele.description.split("\n").map((item, i) => (
                    <p key={"ele-" + i}>{item}</p>
                  ))}
                </Typography>
                <div className={classes.reply}>
                  {ele.reply ? (
                    <div className={classes.p2}>
                      <Typography
                        variant="body1"
                        component={"p"}
                        color="primary"
                        className={classes.cardFeedback}
                      >
                        Admin
                      </Typography>
                      <Typography variant="body1" component={"p"}>
                        {ele.reply}
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Typography
                  variant="body1"
                  component={"p"}
                  className={classes.cardTag}
                >
                  Powered By IntelliGenie
                </Typography>
              </Card>
            );
          })
        ) : (
          <div className={classes.displayFlexCenter}>
            {pageLoading ? (
              <CircularProgress size={30} color="primary" />
            ) : (
              <p>No Queries To Show</p>
            )}
          </div>
        )}
      </div>
      <Modal
        aria-labelledby="Add Sub User"
        aria-describedby="Add Account of a sub user"
        className={classes.modal}
        open={editComplaint}
        onClose={editClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        style={{
          overflowY: "auto",
        }}
      >
        <Fade in={editComplaint}>
          <div className={classes.paper}>
            <Typography
              variant="h6"
              component={"h2"}
              className={classes.editRatingsFeedbacksHeading}
            >
              Edit Query
            </Typography>

            <Typography
              variant="h6"
              component={"h6"}
              className={classes.complaintHeading}
            >
              Query Detail
            </Typography>
            <form
              noValidate
              onSubmit={handleSubmit1((data) => {
                updateComplaint(data);
              })}
            >
              <TextField
                variant={"outlined"}
                multiline
                fullWidth
                rows={8}
                InputLabelProps={{ shrink: true }}
                {...register1("complaint", {
                  required: "Complaint Detail Required",
                  pattern: {
                    value: /^[a-zA-Z0-9_. -]{2,}$/m,
                    message: "Invalid Complaint Detail",
                  },
                })}
                error={Boolean(errors1.complaint)}
                helperText={errors1.complaint?.message}
              />
              <div className={classes.dFlexBetween}>
                <Button
                  className={classes.submitBtn}
                  variant={"contained"}
                  type="submit"
                  disableElevation
                  disabled={actionDisable}
                  color={"primary"}
                >
                  Edit Query
                  {actionDisable ? <Progress color="primary" size={20} /> : ""}
                </Button>
                <Button
                  className={classes.btn}
                  variant="contained"
                  disableElevation
                  onClick={editClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="Delete Sub User"
        aria-describedby="Delete Account of a sub user"
        className={classes.modal}
        open={deleteComplaint}
        onClose={deleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteComplaint}>
          <div className={classes.paper}>
            <div className={classes.modalForm}>
              <div className={classes.displayFlex}>
                <Avatar className={classes.deleteIcon}>
                  <MdDelete />
                </Avatar>
                <Typography
                  variant={"h6"}
                  component={"h3"}
                  className={classes.dangerHeading}
                >
                  Delete Query Permanently
                </Typography>
              </div>
            </div>
            <div className={classes.contentBox}>
              <Typography variant="body2" className={classes.contentPart1}>
                This will permenantly delete query from IntelliGenie.
              </Typography>
              <div className={classes.dFlexBetween}>
                <Button
                  className={[classes.btn, classes.btnDanger].join(" ")}
                  variant="contained"
                  disableElevation
                  color="red"
                  disabled={actionDisable}
                  onClick={removeComplaint}
                >
                  Delete Query
                  {actionDisable ? <Progress color="primary" size={20} /> : ""}
                </Button>
                <Button
                  className={[classes.ml3, classes.btn]}
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
    </div>
  );
}

export default Query;
