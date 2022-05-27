import {
  Button,
  Card,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Avatar,
  CircularProgress,
  alpha,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { MdDelete, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";
import React, { useEffect, useState } from "react";
import Snackbar from "./Snackbar";
import axios from "axios";

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
    flexWrap: "wrap",
  },
  feedbackCard: {
    flexGrow: 1,
    width: "300px",
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

function RatingFeedback() {
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const classes = useStyles();
  const [rating, setRating] = useState(5);
  const [disable, setDisable] = useState(false);
  const [actionID, setActionID] = useState("");

  const [pageLoading, setPageLoading] = useState(true);

  const [editRating, setEditRating] = useState(5);
  const [actionDisable, setActionDisable] = useState(false);

  const [othersFeedbacks, setOthersFeedbacks] = useState([]);
  const [myFeedbacks, setMyFeedbacks] = useState([]);

  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  //   Edit Feedback Modal methods
  const [editFeedback, seteditFeedback] = useState(false);

  const editOpen = () => {
    seteditFeedback(true);
  };

  const editClose = () => {
    seteditFeedback(false);
  };

  const [deleteFeedback, setdeleteFeedback] = useState(false);

  const deleteOpen = () => {
    setdeleteFeedback(true);
  };

  const deleteClose = () => {
    setdeleteFeedback(false);
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

  function postFeedback(data) {
    console.log(data);
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/provideReviewAndFeedback${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        review: rating,
        feedback: data.feedback,
      },
    };

    axios(config)
      .then(function (response) {
        setMyFeedbacks([response.data, ...myFeedbacks]);
        setDisable(false);
        setSnackData({
          type: "success",
          message: "Feedback posted successfully",
          open: true,
        });
        reset();
        setRating(5);
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error posting feedback",
          open: true,
        });
      });
  }

  function updateFeedback(data) {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setActionDisable(true);
    var config = {
      method: "put",
      url: `${BACKEND}/userRouter/updateReviewAndFeedback${actionID}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        review: editRating,
        feedback: data.feedback,
      },
    };

    axios(config)
      .then(function (response) {
        setMyFeedbacks(
          myFeedbacks.map((ele) =>
            ele._id == actionID
              ? { ...ele, review: editRating, feedback: data.feedback }
              : ele
          )
        );
        setActionDisable(false);
        setSnackData({
          type: "success",
          message: "Feedback updated successfully",
          open: true,
        });
        reset();
        setRating(0);
        editClose();
      })
      .catch(function (error) {
        console.log(error);
        setActionDisable(false);
        setSnackData({
          type: "error",
          message: "Error updating feedback",
          open: true,
        });
      });
  }

  function removeFeedback(data) {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setActionDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/userRouter/deleteReviewAndFeedback${actionID}/user${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        review: editRating,
        feedback: data.feedback,
      },
    };

    axios(config)
      .then(function (response) {
        setMyFeedbacks(myFeedbacks.filter((ele) => ele._id !== actionID));
        setActionDisable(false);
        setSnackData({
          type: "success",
          message: "Feedback Deleted successfully",
          open: true,
        });
        deleteClose();
      })
      .catch(function (error) {
        console.log(error);
        setActionDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting feedback",
          open: true,
        });
      });
  }

  function getReviews() {
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewAllReviews`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setOthersFeedbacks(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          type: "error",
          message: "Error getting feedbacks",
          open: true,
        });
      });
  }

  function getmyReviews() {
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewAllReviews${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        // setMyFeedbacks(response.data);
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          type: "error",
          message: "Error getting feedbacks",
          open: true,
        });
      });
  }

  useEffect(() => {
    getReviews();
    getmyReviews();
  }, []);

  return (
    <div className={classes.content}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Typography variant="h6" component={"h1"} className={classes.heading}>
        RATINGS AND FEEDBACKS
      </Typography>
      <Typography
        variant="h6"
        component={"h2"}
        className={classes.ratingFeedbackHead}
      >
        Your Feedback
      </Typography>
      <Card className={classes.ratingFeedbackCard}>
        <Typography
          variant="h6"
          component={"h6"}
          className={classes.ratingHeading}
        >
          Please Rate Us
        </Typography>
        <Rating
          name="simple-controlled"
          size="large"
          value={rating}
          onChange={(_, val) => setRating(val)}
        />
        <Typography
          variant="h6"
          component={"h6"}
          className={classes.feedbackHeading}
        >
          Please Provide Feedback
        </Typography>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            postFeedback(data);
          })}
        >
          <TextField
            variant={"outlined"}
            multiline
            fullWidth
            rows={8}
            InputLabelProps={{ shrink: true }}
            {...register("feedback", {
              required: "Feedback Required",
              pattern: {
                value: /^[a-zA-Z0-9_. -]{2,}$/m,
                message: "Invalid Feedback",
              },
            })}
            error={Boolean(errors.feedback)}
            helperText={errors.feedback?.message}
          />
          <div className={classes.dFlexBetween}>
            <Button
              className={classes.submitBtn}
              variant={"contained"}
              type="submit"
              disabled={disable}
              color={"primary"}
            >
              Submit Feedback
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
        Your Feedbacks
      </Typography>
      <div className={classes.ratingsFeedbacksContainer}>
        {myFeedbacks.length > 0 ? (
          myFeedbacks.map((ele) => {
            return (
              <Card className={classes.feedbackCard}>
                <div className={classes.dFlexBetween}>
                  <div>
                    <Typography
                      variant="h6"
                      component={"h3"}
                      className={classes.cardName}
                    >
                      {ele.userFullName}
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      size="small"
                      value={ele.review}
                      disabled
                      className={classes.cardRating}
                    />
                  </div>
                  <div>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => {
                        setActionID(ele._id);
                        setEditRating(ele.review);
                        setValue("feedback", ele.feedback);
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
                  component={"p"}
                  className={classes.cardFeedback}
                >
                  {ele.feedback.split("\n").map((item) => (
                    <p>{item}</p>
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
              <p>No Feedbacks To Show</p>
            )}
          </div>
        )}
      </div>
      <Typography
        variant="h6"
        component={"h2"}
        className={classes.ratingsFeedbacksHeading}
      >
        Other People Feedbacks
      </Typography>
      <div className={classes.ratingsFeedbacksContainer}>
        {othersFeedbacks.length > 0 ? (
          othersFeedbacks.map((ele) => {
            return (
              <Card className={classes.feedbackCard}>
                <Typography
                  variant="h6"
                  component={"h3"}
                  className={classes.cardName}
                >
                  {ele.userFullName}
                </Typography>
                <Rating
                  name="simple-controlled"
                  size="small"
                  value={ele.review}
                  disabled
                  className={classes.cardRating}
                />
                <Typography
                  variant="body1"
                  component={"p"}
                  className={classes.cardFeedback}
                >
                  {ele.feedback.split("\n").map((item) => (
                    <p>{item}</p>
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
            <CircularProgress size={30} color="primary" />
          </div>
        )}
      </div>
      <Modal
        aria-labelledby="Add Sub User"
        aria-describedby="Add Account of a sub user"
        className={classes.modal}
        open={editFeedback}
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
        <Fade in={editFeedback}>
          <div className={classes.paper}>
            <Typography
              variant="h6"
              component={"h2"}
              className={classes.editRatingsFeedbacksHeading}
            >
              Edit Feedback
            </Typography>
            <div>
              <Typography
                variant="h6"
                component={"h6"}
                className={classes.ratingHeading}
              >
                Please Rate Us
              </Typography>
              <Rating
                name="Edit-controlled"
                size="large"
                value={editRating}
                onChange={(_, val) => setEditRating(val)}
              />
              <Typography
                variant="h6"
                component={"h6"}
                className={classes.feedbackHeading}
              >
                Please Provide Feedback
              </Typography>
              <form
                noValidate
                onSubmit={handleSubmit1((data) => {
                  updateFeedback(data);
                })}
              >
                <TextField
                  variant={"outlined"}
                  multiline
                  fullWidth
                  rows={8}
                  InputLabelProps={{ shrink: true }}
                  {...register1("feedback", {
                    required: "Feedback Required",
                    pattern: {
                      value: /^[a-zA-Z0-9 _.-]{2,}$/m,
                      message: "Invalid Feedback",
                    },
                  })}
                  error={Boolean(errors1.feedback)}
                  helperText={errors1.feedback?.message}
                />
                <div className={classes.dFlexBetween}>
                  <Button
                    className={classes.submitBtn}
                    variant={"contained"}
                    type="submit"
                    disabled={actionDisable}
                    color={"primary"}
                  >
                    Edit Feedback
                    {actionDisable ? (
                      <Progress color="primary" size={20} />
                    ) : (
                      ""
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    className={[classes.btn, classes.ml3]}
                    onClick={editClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="Delete Sub User"
        aria-describedby="Delete Account of a sub user"
        className={classes.modal}
        open={deleteFeedback}
        onClose={deleteClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteFeedback}>
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
                  Delete Feedback Permanently
                </Typography>
              </div>
            </div>
            <div className={classes.contentBox}>
              <Typography variant="body2" className={classes.contentPart1}>
                This will permenantly delete feedback from IntelliGenie.
              </Typography>
              <div className={classes.dFlexBetween}>
                <Button
                  className={[classes.btn, classes.btnDanger].join(" ")}
                  variant="contained"
                  disableElevation
                  color="red"
                  disabled={actionDisable}
                  onClick={removeFeedback}
                >
                  Delete Feedback
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

export default RatingFeedback;
