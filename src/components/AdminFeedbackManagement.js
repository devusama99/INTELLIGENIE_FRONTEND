import {
  Avatar,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  alpha,
  Chip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { MdDelete } from "react-icons/md";
import Snackbar from "./Snackbar";
import {
  FiX as NotRespondedIcon,
  FiCheck as RespondedIcon,
} from "react-icons/fi";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Progress from "./ButtonLoader";

const useStyle = makeStyles((theme) => ({
  notResponded: {
    backgroundColor: theme.palette.danger.main,
    color: theme.palette.light.main,
  },
  responded: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.light.main,
  },
  icon: {
    color: theme.palette.light.main,
  },
  deleteBtn: {
    backgroundColor: theme.palette.danger.main,
    boxShadow: "none",
    display: "block",
    color: theme.palette.light.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.danger.main, 0.8),
    },
  },
  btnGroup: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
  },
  deleteIcon: {
    backgroundColor: theme.palette.danger.main,
  },
  dangerHeading: {
    color: theme.palette.danger.main,
    marginLeft: theme.spacing(3),
    fontWeight: "bold",
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  content: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2.5),
      width: "90%",
    },
  },
  contentContainer: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
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
  formItem: {
    marginTop: theme.spacing(3),
  },
  ml3: {
    marginLeft: theme.spacing(3),
  },
  btn: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    alignSelf: "flex-end",
  },
  tableContainer: {
    width: "98.5%",
  },
  dFlexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
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
}));

function AdminFeedbackManagement() {
  const classes = useStyle();

  const [feedbacks, setFeedbacks] = useState([]);
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [actionId, setActionId] = useState("");
  const [activeFeedback, setActiveFeedback] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [disable, setDisable] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  //   Edit User Modal methods
  const [editUser, setEditUser] = useState(false);

  const editOpen = () => {
    setEditUser(true);
    reset();
  };

  const editClose = () => {
    setEditUser(false);
    setActionId("");
    setActiveFeedback("");
  };

  //   Delete User Modal methods
  const [deleteUser, setDeleteUser] = useState(false);

  const deleteOpen = () => {
    setDeleteUser(true);
  };

  const deleteClose = () => {
    setDeleteUser(false);
  };

  function getAllFeedbacks() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewAllFeedbacks`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setFeedbacks(...feedbacks, response.data);
        setPageLoading(false);
      })
      .catch(function (error) {
        setPageLoading(false);
        setSnackData({
          message: "Error Loading Data",
          type: "error",
          open: true,
        });
      });
  }

  function replyFeedback(data) {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "put",
      url: `${BACKEND}/adminRouter/respondToFeedback${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: { reply: data.feedbackReply },
    };

    axios(config)
      .then(function (response) {
        console.log(feedbacks);
        setFeedbacks([
          ...feedbacks.map((ele) =>
            ele._id === actionId ? { ...ele, isResponded: true } : ele
          ),
        ]);
        console.log(feedbacks);
        setSnackData({
          message: "Reply Sent Successfully",
          type: "success",
          open: true,
        });
        editClose();
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Replying Feedback",
          type: "error",
          open: true,
        });
      });
    setDisable(false);
  }

  function removeFeedback() {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/adminRouter/deleteReview${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(feedbacks.filter((ele) => ele._id !== actionId));
        setFeedbacks([...feedbacks.filter((ele) => ele._id !== actionId)]);
        setDisable(false);
        setSnackData({
          type: "success",
          message: "Feedback Deleted successfully",
          open: true,
        });
        deleteClose();
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting feedback",
          open: true,
        });
      });
  }

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div className={classes.content}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <Typography
        variant={"h5"}
        component={"h2"}
        className={classes.heading}
        gutterBottom
      >
        FEEDBACK MANAGEMENT
      </Typography>
      <div className={classes.tableContainer}>
        <MaterialTable
          style={{ boxShadow: "none", border: "1px solid 	#E8E8E8" }}
          isLoading={pageLoading}
          title=""
          columns={[
            {
              title: "Name",
              field: "userFullName",
            },
            {
              title: "Rating",
              field: "review",
              render: (rowData) => (
                <Rating name="disabled" value={rowData.review} disabled />
              ),
            },
            {
              title: "Feedback",
              field: "feedback",
              type: "String",
              cellStyle: {
                width: "40%",
                minWidth: "400px",
              },
            },
            {
              title: "Response",
              field: "isResponded",
              render: (rowData) =>
                rowData.isResponded ? (
                  <Chip
                    label="Responded"
                    className={classes.responded}
                    icon={<RespondedIcon className={classes.icon} />}
                  />
                ) : (
                  <Chip
                    label="Not Responded"
                    className={classes.notResponded}
                    icon={<NotRespondedIcon className={classes.icon} />}
                  />
                ),
            },
          ]}
          data={feedbacks}
          actions={[
            {
              icon: "edit",
              tooltip: "Reply Feedback",
              onClick: (e, data) => {
                setActionId(data._id);
                setActiveFeedback(data.feedback);
                editOpen();
              },
              iconProps: {
                style: { color: "#7fbfbf" },
              },
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (e, data) => {
                setActionId(data._id);
                deleteOpen();
              },
              iconProps: {
                style: { color: "#7fbfbf" },
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            exportFileName: "Feedbacks",
            exportAllData: true,
            emptyRowsWhenPaging: false,
            headerStyle: {
              backgroundColor: "#7FBFBF",
              color: "#444",
              textAlign: "left",
              fontWeight: "bold",
            },
            tableLayout: "auto",
          }}
        />
      </div>
      <Modal
        aria-labelledby="Edit Sub User Modal"
        aria-describedby="Edit sub user detail and update them"
        className={classes.modal}
        open={editUser}
        onClose={editClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editUser}>
          <div className={classes.paper}>
            <Typography
              variant={"h5"}
              color={"primary"}
              id="transition-modal-title"
            >
              Reply Feedback
            </Typography>
            <div className={classes.modalForm}>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  replyFeedback(data);
                })}
              >
                <Typography
                  variant={"h6"}
                  color={"primary"}
                  id="transition-modal-title"
                  className={classes.formItem}
                >
                  Feedback
                </Typography>
                <Typography
                  variant="inherit"
                  id="transition-modal-title"
                  className={classes.formItem}
                >
                  {activeFeedback}
                </Typography>
                <Typography
                  variant={"h6"}
                  color={"primary"}
                  id="transition-modal-title"
                  className={classes.formItem}
                >
                  Reply
                </Typography>
                <TextField
                  variant={"outlined"}
                  multiline
                  fullWidth
                  rows={8}
                  InputLabelProps={{ shrink: true }}
                  {...register("feedbackReply", {
                    required: "Reply Required",
                    pattern: {
                      value: /^[a-zA-Z0-9_. -]{2,}$/m,
                      message: "Invalid Reply",
                    },
                  })}
                  error={Boolean(errors.feedbackReply)}
                  helperText={errors.feedbackReply?.message}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant={"contained"}
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={disable}
                    disableElevation
                  >
                    Reply Feedback
                    {disable ? <Progress color="primary" size={20} /> : ""}
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={editClose}
                  >
                    Close
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
                  disabled={disable}
                  onClick={removeFeedback}
                >
                  Delete Feedback
                  {disable ? <Progress color="primary" size={20} /> : ""}
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

export default AdminFeedbackManagement;
