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

function AdminFaqsManagement() {
  const classes = useStyle();

  const [FAQs, setFAQs] = useState([]);
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [actionId, setActionId] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm();

  const [disable, setDisable] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const [addUser, setAddUser] = useState(false);

  const addOpen = () => {
    setAddUser(true);
    reset1();
  };

  const addClose = () => {
    setAddUser(false);
  };

  //   Edit User Modal methods
  const [editUser, setEditUser] = useState(false);

  const editOpen = () => {
    setEditUser(true);
  };

  const editClose = () => {
    setEditUser(false);
    setActionId("");
  };

  //   Delete User Modal methods
  const [deleteUser, setDeleteUser] = useState(false);

  const deleteOpen = () => {
    setDeleteUser(true);
  };

  const deleteClose = () => {
    setDeleteUser(false);
  };

  function getAllFAQs() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewAllFAQs`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data === "No Un-Responded FAQs Found") setFAQs([]);
        else setFAQs(...FAQs, response.data);
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

  function addFAQ(data) {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/addFAQ`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFAQs([response.data, ...FAQs]);
        setSnackData({
          message: "FAQ Added Successfully",
          type: "success",
          open: true,
        });
        addClose();
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error FAQ Edit",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }

  function editFAQ(data) {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "put",
      url: `${BACKEND}/adminRouter/updateFAQ${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFAQs([
          ...FAQs.map((ele) =>
            ele._id === actionId ? { _id: actionId, ...data } : ele
          ),
        ]);
        setSnackData({
          message: "FAQ Edit Successful",
          type: "success",
          open: true,
        });
        editClose();
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error FAQ Edit",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }

  function removeFAQ() {
    setSnackData({
      type: "error",
      message: "",
      open: false,
    });
    setDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/adminRouter/deleteFAQ${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setFAQs([...FAQs.filter((ele) => ele._id !== actionId)]);
        setDisable(false);
        setSnackData({
          type: "success",
          message: "FAQ Deleted successfully",
          open: true,
        });
        deleteClose();
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting FAQ",
          open: true,
        });
      });
  }

  useEffect(() => {
    getAllFAQs();
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
        FAQs MANAGEMENT
      </Typography>
      <Button
        color="primary"
        variant="contained"
        style={{ marginBottom: 20, marginRight: 10, alignSelf: "flex-end" }}
        onClick={addOpen}
        disableElevation
      >
        Add FAQ
      </Button>
      <div className={classes.tableContainer}>
        <MaterialTable
          style={{ boxShadow: "none", border: "1px solid 	#E8E8E8" }}
          isLoading={pageLoading}
          title=""
          columns={[
            {
              title: "Questions",
              field: "question",
              cellStyle: {
                minWidth: 200,
              },
            },
            {
              title: "Answers",
              field: "answer",
              cellStyle: {
                minWidth: 300,
              },
            },
          ]}
          data={FAQs}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit FAQ",
              onClick: (e, data) => {
                setActionId(data._id);
                setValue("question", data.question);
                setValue("answer", data.answer);
                editOpen();
              },
              iconProps: {
                style: { color: "#7fbfbf" },
              },
            },
            {
              icon: "delete",
              tooltip: "Delete FAQ",
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
            exportFileName: "FAQs",
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
        open={addUser}
        onClose={addClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addUser}>
          <div className={classes.paper}>
            <Typography
              variant={"h5"}
              color={"primary"}
              id="transition-modal-title"
            >
              Create FAQ
            </Typography>
            <div className={classes.modalForm}>
              <form
                noValidate
                onSubmit={handleSubmit1((data) => {
                  addFAQ(data);
                })}
              >
                <TextField
                  variant={"outlined"}
                  multiline
                  label="Question"
                  fullWidth
                  className={classes.formItem}
                  InputLabelProps={{ shrink: true }}
                  {...register1("question", {
                    required: "Question Required",
                    pattern: {
                      value: /^[a-zA-Z0-9?_. -]{2,}$/m,
                      message: "Invalid Question",
                    },
                  })}
                  error={Boolean(errors1.question)}
                  helperText={errors1.question?.message}
                />
                <TextField
                  variant={"outlined"}
                  multiline
                  label="Answer"
                  fullWidth
                  className={classes.formItem}
                  rows={8}
                  InputLabelProps={{ shrink: true }}
                  {...register1("answer", {
                    required: "Answer Required",
                    pattern: {
                      value: /^[a-zA-Z0-9%,_. -]{2,}$/m,
                      message: "Invalid Answer",
                    },
                  })}
                  error={Boolean(errors1.answer)}
                  helperText={errors1.answer?.message}
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
                    Add FAQ
                    {disable ? <Progress color="primary" size={20} /> : ""}
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={addClose}
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
              Edit FAQ
            </Typography>
            <div className={classes.modalForm}>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  editFAQ(data);
                })}
              >
                <TextField
                  variant={"outlined"}
                  multiline
                  label="Question"
                  fullWidth
                  className={classes.formItem}
                  InputLabelProps={{ shrink: true }}
                  {...register("question", {
                    required: "Question Required",
                    pattern: {
                      value: /^[a-zA-Z0-9?_. -]{2,}$/m,
                      message: "Invalid Question",
                    },
                  })}
                  error={Boolean(errors.question)}
                  helperText={errors.question?.message}
                />
                <TextField
                  variant={"outlined"}
                  multiline
                  label="Answer"
                  fullWidth
                  className={classes.formItem}
                  rows={8}
                  InputLabelProps={{ shrink: true }}
                  {...register("answer", {
                    required: "Answer Required",
                    pattern: {
                      value: /^[a-zA-Z0-9%,_. -]{2,}$/m,
                      message: "Invalid Answer",
                    },
                  })}
                  error={Boolean(errors.answer)}
                  helperText={errors.answer?.message}
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
                    Edit FAQ
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
                  &nbsp; Delete FAQ Permanently
                </Typography>
              </div>
            </div>
            <div className={classes.contentBox}>
              <Typography variant="body2" className={classes.contentPart1}>
                This will permenantly delete FAQ from IntelliGenie.
              </Typography>
              <div className={classes.dFlexBetween}>
                <Button
                  className={[classes.btn, classes.btnDanger].join(" ")}
                  variant="contained"
                  disableElevation
                  disabled={disable}
                  onClick={removeFAQ}
                >
                  Delete FAQ
                  {disable ? <Progress color="primary" size={20} /> : ""}
                </Button>
                <Button
                  className={[classes.ml3, classes.btn].join(" ")}
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

export default AdminFaqsManagement;
