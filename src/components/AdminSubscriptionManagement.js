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
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";

const useStyle = makeStyles((theme) => ({
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
  deleteBtn: {
    backgroundColor: theme.palette.danger.main,
    boxShadow: "none",
    color: theme.palette.light.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.danger.main, 0.8),
    },
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
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(1),
    alignSelf: "flex-end",
  },
  tableContainer: {
    width: "98.5%",
  },
}));

function AdminSubscriptionManagement() {
  const classes = useStyle();
  const [users, setUsers] = useState([]);
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

  function AddUser(data) {
    setSnackData({ ...snackData, open: false });
    setDisable(!disable);
    const temp = {
      SubscriptionFeatures: data.features.split("\n"),
      SubscriptionPrice: data.price,
      AllowedSubUsers: data.subusers,
      SubscriptionName: data.name,
    };
    var config = {
      method: "post",
      url: `${BACKEND}/adminRouter/createSubscription`,
      headers: {
        "Content-Type": "application/json",
      },
      data: temp,
    };
    console.log(temp);
    axios(config)
      .then(function (res) {
        setSnackData({
          message: "Subscription Created Successfuly",
          type: "success",
          open: true,
        });
        reset();
        setDisable(false);
        setUsers([res.data, ...users]);
        addClose();

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

  function EditUser(data) {
    console.log(actionId);
    setDisable(true);
    setSnackData({ ...snackData, open: false });
    const temp = {
      SubscriptionFeatures: data.features.split("\n"),
      SubscriptionPrice: data.price,
      AllowedSubUsers: data.subusers,
      SubscriptionName: data.name,
    };
    var config = {
      method: "put",
      url: `${BACKEND}/adminRouter/updateSubscription${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: temp,
    };

    axios(config)
      .then(function (response) {
        setSnackData({
          message: "Subscription Updated Succesfully",
          type: "success",
          open: true,
        });

        setUsers([
          { ...temp, _id: actionId },
          ...users.filter((ele) => data.name !== ele.SubscriptionName),
        ]);
        setDisable(false);
        editClose();
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Updating Subscription",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }
  function editReady(data) {
    setValue("price", data.SubscriptionPrice);
    setValue("name", data.SubscriptionName);
    setValue("subusers", data.AllowedSubUsers);
    setValue("features", data.SubscriptionFeatures.join("\n"));
    setActionId(data._id);
    editOpen();
  }
  function DeleteUser() {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var config = {
      method: "delete",
      url: `${BACKEND}/adminRouter/deleteSubscription${actionId}`,
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
          message: "Subscription Deleted Successfully",
          open: true,
        });
        setDisable(false);
        setUsers([...users.filter((ele) => ele._id !== actionId)]);
        deleteClose();
        setActionId("");
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error Deleting Subscription",
          open: true,
        });
      });
  }

  function getAllUsers() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewAllSubscription`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data[0]);
        setUsers(response.data);
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
    getAllUsers();
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
        SUBSCRIPTION MANAGEMENT
      </Typography>
      <Button
        variant={"contained"}
        className={classes.btn}
        color="primary"
        disableElevation
        onClick={addOpen}
      >
        Add Subscripition
      </Button>
      <div className={classes.tableContainer}>
        <MaterialTable
          isLoading={pageLoading}
          style={{ boxShadow: "none", border: "1px solid 	#E8E8E8" }}
          title=" "
          columns={[
            {
              title: "Subscription Name",
              field: "SubscriptionName",
            },
            {
              title: "Features",
              field: "SubscriptionFeatures",
              render: (rowData) =>
                rowData.SubscriptionFeatures.map((ele) => (
                  <>
                    <p>{ele}</p>
                  </>
                )),
            },
            {
              title: "Price",
              field: "SubscriptionPrice",
              render: (rowData) => <p>$ {rowData.SubscriptionPrice}</p>,
            },
          ]}
          data={users}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit User",
              onClick: (e, data) => {
                editReady(data);
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
            exportFileName: "All Users",
            exportAllData: true,
            emptyRowsWhenPaging: false,
            headerStyle: {
              backgroundColor: "#7FBFBF",
              color: "#444",
              fontWeight: "bold",
              textAlign: "left",
            },
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
              Edit Sub User
            </Typography>
            <div className={classes.modalForm}>
              <form
                noValidate
                onSubmit={handleSubmit1((data) => {
                  EditUser(data);
                })}
              >
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Name"}
                  name="name"
                  className={classes.formItem}
                  {...register1("name", {
                    required: " Name required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Invalid Name",
                    },
                  })}
                  error={Boolean(errors1.name)}
                  helperText={errors1.name?.message}
                  fullWidth
                ></TextField>
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Price"}
                  name="price"
                  className={classes.formItem}
                  {...register1("price", {
                    required: " Price required",
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: "Invalid Price",
                    },
                  })}
                  error={Boolean(errors1.price)}
                  helperText={errors1.price?.message}
                  fullWidth
                ></TextField>
                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Allowed Subusers"}
                  name="subusers"
                  className={classes.formItem}
                  {...register1("subusers", {
                    required: " Subusers required",
                    pattern: {
                      value: /^[1-5]*$/,
                      message: "Invalid Subusers",
                    },
                  })}
                  error={Boolean(errors1.subusers)}
                  helperText={errors1.subusers?.message}
                  fullWidth
                ></TextField>

                <TextField
                  variant={"outlined"}
                  InputLabelProps={{ shrink: true }}
                  size={"medium"}
                  color={"primary"}
                  label={"Features"}
                  multiline
                  rows={8}
                  className={classes.formItem}
                  name="features"
                  {...register1("features", {
                    required: "Features Required",
                    pattern: {
                      value: /^[a-zA-Z0-9 _.-]{2,}$/m,
                      message: "Invalid Features",
                    },
                  })}
                  fullWidth
                  error={Boolean(errors1.features)}
                  helperText={errors1.features?.message}
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
                    Edit Subscription
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
                  Delete Subscription Permanently
                </Typography>
              </div>
            </div>
            <div className={classes.contentBox}>
              <Typography variant="body2" className={classes.contentPart1}>
                Permenantly Delete Subscription from IntelliGenie.
              </Typography>

              <div className={classes.btnGroup}>
                <Button
                  className={classes.deleteBtn}
                  variant="contained"
                  onClick={DeleteUser}
                  disabled={disable}
                  disableElevation
                >
                  Delete Subscription
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
              Add Subscription
            </Typography>
            <div className={classes.modalForm}>
              <div className={classes.modalForm}>
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    AddUser(data);
                  })}
                >
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Name"}
                    name="name"
                    className={classes.formItem}
                    {...register("name", {
                      required: " Name required",
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Invalid Name",
                      },
                    })}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Price"}
                    name="price"
                    className={classes.formItem}
                    {...register("price", {
                      required: " Price required",
                      pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "Invalid Price",
                      },
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                    fullWidth
                  ></TextField>
                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Allowed Subusers"}
                    name="subusers"
                    className={classes.formItem}
                    {...register("subusers", {
                      required: " Subusers required",
                      pattern: {
                        value: /^[1-5]*$/,
                        message: "Invalid Subusers",
                      },
                    })}
                    error={Boolean(errors.subusers)}
                    helperText={errors.subusers?.message}
                    fullWidth
                  ></TextField>

                  <TextField
                    variant={"outlined"}
                    InputLabelProps={{ shrink: true }}
                    size={"medium"}
                    color={"primary"}
                    label={"Features"}
                    multiline
                    rows={8}
                    className={classes.formItem}
                    name="features"
                    {...register("features", {
                      required: "Features Required",
                      pattern: {
                        value: /^[a-zA-Z0-9 _.-]{2,}$/m,
                        message: "Invalid Features",
                      },
                    })}
                    fullWidth
                    error={Boolean(errors.features)}
                    helperText={errors.features?.message}
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
                      Add Subscription
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
    </div>
  );
}

export default AdminSubscriptionManagement;
