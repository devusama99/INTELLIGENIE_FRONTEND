import {
  Avatar,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  alpha,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import { FiTrash as DeleteIcon } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import ProfileTemplate from "./ProfileTemplate";
import BoxContainerWhite from "./BoxContainerWhite";
import { useForm } from "react-hook-form";
import axios from "axios";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  MuiTableRow: {
    height: "50px",
  },
  deleteBtn: {
    backgroundColor: theme.palette.danger.main,
    boxShadow: "none",
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
  contentPart1: {
    width: "100%",
    textAlign: "justify",
    marginTop: theme.spacing(2),
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
    width: "100%",
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: theme.spacing(5),
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
    backgroundImage: `linear-gradient(95.47deg, ${theme.palette.secondary.main} 0.51%, ${theme.palette.primary.main} 99.64%)`,
    color: theme.palette.light.main,
    marginTop: theme.spacing(3),
  },
}));

function AddSubUser() {
  const classes = useStyle();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [actionId, setActionId] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    setValue,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [subUsers, setSubUsers] = useState([]);
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
  };

  const editClose = () => {
    setEditUser(false);
  };

  //   Delete User Modal methods
  const [deleteUser, setDeleteUser] = useState(false);

  const deleteOpen = () => {
    setDeleteUser(true);
  };

  const deleteClose = () => {
    setDeleteUser(false);
  };
  //   Add User Modal methods
  const [addUser, setAddUser] = useState(false);

  const addOpen = () => {
    setAddUser(true);
  };

  const addClose = () => {
    setAddUser(false);
    reset();
  };

  function AddSubUser(data) {
    console.log(data);
    setSnackData({ ...snackData, open: false });
    setDisable(true);

    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/createSubUser${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (res) {
        if (res.data !== "Username ALready Exist") {
          setSnackData({
            message: "User Registered Successfuly",
            type: "success",
            open: true,
          });
          setSubUsers([...subUsers, res.data]);
          reset();
          addClose();
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
  function EditSubUser(data) {
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

        setSubUsers([
          ...subUsers.filter((ele) => data.username !== ele.username),
          data,
        ]);
        setDisable(false);
        editClose();
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
  function editReady(data) {
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("userEmail", data.userEmail);
    setValue("username", data.username);
    editOpen();
  }
  function DeleteSubUser() {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/userRouter/deleteUser${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setSnackData({
          type: "success",
          message: "Sub User Deleted Successfully",
          open: true,
        });
        setDisable(false);
        setSubUsers([...subUsers.filter((ele) => ele._id !== actionId)]);
        deleteClose();
        setActionId("");
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting SubUser",
          open: true,
        });
      });
  }
  function getAllSubusers() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/allSubUsers${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setSubUsers(response.data);
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setPageLoading(false);
        setSnackData({
          message: "Error Loading Data",
          type: "error",
          open: true,
        });
      });
  }

  useEffect(() => {
    getAllSubusers();
  }, []);

  return (
    <div className={classes.content}>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <BoxContainerWhite className={classes.width90}>
        <Typography
          variant={"h5"}
          component={"h2"}
          className={classes.heading}
          gutterBottom
        >
          MANAGE SUB USERS
        </Typography>
        <div className={classes.tableContainer}>
          <MaterialTable
            style={{ boxShadow: "none", border: "1px solid 	#E8E8E8" }}
            title=" "
            isLoading={pageLoading}
            columns={[
              {
                title: "Name",
                field: "firstName",
                render: (rowData) => (
                  <p>{rowData.firstName + " " + rowData.lastName}</p>
                ),
              },
              { title: "Email", field: "userEmail" },
              { title: "Username", field: "username" },
              {
                title: "Creation Date",
                field: "creationDate",
                render: (rowData) => (
                  <p>{moment(rowData.createdAt).format("DD MMM, YYYY")}</p>
                ),
              },
            ]}
            data={subUsers}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit User",
                onClick: (e, data) => editReady(data),
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
              exportFileName: "Sub Users",
              exportAllData: true,
              emptyRowsWhenPaging: false,
              headerStyle: {
                backgroundColor: "#7FBFBF",
                color: "#444",
              },
            }}
          />
        </div>
        <Button
          variant={"contained"}
          className={classes.btn}
          onClick={addOpen}
          disableElevation
        >
          Add Sub User
        </Button>
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
                Edit Sub User
              </Typography>
              <div className={classes.modalForm}>
                <form
                  noValidate
                  onSubmit={handleSubmit1((data) => {
                    EditSubUser(data);
                  })}
                >
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"First Name"}
                    name="firstName"
                    className={classes.formItem}
                    {...register1("firstName", {
                      required: "First name required",
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Invalid first name",
                      },
                    })}
                    error={Boolean(errors1.firstName)}
                    helperText={errors1.firstName?.message}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Last Name"}
                    className={classes.formItem}
                    name="lastName"
                    {...register1("lastName", {
                      required: "Last name required",
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Invalid last name",
                      },
                    })}
                    error={Boolean(errors1.lastName)}
                    helperText={errors1.lastName?.message}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Email"}
                    name="userEmail"
                    className={classes.formItem}
                    {...register1("userEmail", {
                      required: "Email required",
                      pattern: {
                        value:
                          /^[a-zA-Z]+[a-zA-Z0-9_.-]{1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/,
                        message: "Invalid email",
                      },
                    })}
                    error={Boolean(errors1.userEmail)}
                    helperText={errors1.userEmail?.message}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    disabled
                    size={"medium"}
                    color={"primary"}
                    label={"Username"}
                    name="username"
                    className={classes.formItem}
                    {...register1("username", {
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
                    error={Boolean(errors1.username)}
                    helperText={errors1.username?.message}
                    fullWidth
                  ></TextField>

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
                      Edit Subuser
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
                    onClick={DeleteSubUser}
                    disabled={disable}
                    disableElevation
                  >
                    Delete Account{" "}
                    {disable ? <Progress color="primary" size={20} /> : ""}
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
        <Modal
          aria-labelledby="Add Sub User"
          aria-describedby="Add Account of a sub user"
          className={classes.modal}
          open={addUser}
          onClose={addClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
          style={{
            overflowY: "auto",
          }}
        >
          <Fade in={addUser}>
            <div className={classes.paper}>
              <Typography
                variant={"h5"}
                color={"primary"}
                id="transition-modal-title"
              >
                Add Sub User
              </Typography>
              <div className={classes.modalForm}>
                <div className={classes.modalForm}>
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      AddSubUser(data);
                    })}
                  >
                    <TextField
                      variant={"outlined"}
                      InputLabelProps={{ shrink: true }}
                      size={"medium"}
                      color={"primary"}
                      label={"First Name"}
                      name="firstName"
                      className={classes.formItem}
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
                      className={classes.formItem}
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
                      className={classes.formItem}
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
                      className={classes.formItem}
                      {...register("username", {
                        required: "Username Required",
                        pattern: {
                          value: /^[a-zA-Z]+[a-zA-Z0-9_.-]{2,}$/,
                          minLength: {
                            value: 6,
                            message:
                              "Username can not be less than 3 characters",
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
                      className={classes.formItem}
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
                      className={classes.formItem}
                      name="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password Required",
                        validate: (value) =>
                          value === password.current ||
                          "Passwords do not match",
                      })}
                      type={"password"}
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                    ></TextField>
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
                        Add Subuser
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
            </div>
          </Fade>
        </Modal>
      </BoxContainerWhite>
    </div>
  );
}

export default AddSubUser;
