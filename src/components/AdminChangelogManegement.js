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

function AdminChangelogManagement() {
  const classes = useStyle();

  const [Changelog, setChangelog] = useState([]);
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const [actionId, setActionId] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
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
  };

  const editClose = () => {
    setEditUser(false);
    setActionId("");
  };

  //   Delete User Modal methods

  function getAllChangelog() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewChangeLog`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setChangelog([response.data]);
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

  function editChangelog(data) {
    setSnackData({ ...snackData, open: false });
    setDisable(true);
    var data1 = data.changelog.trim().split("\n");
    console.log(data1, actionId);
    var config = {
      method: "put",
      url: `${BACKEND}/adminRouter/editChangelog${actionId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: { changeLog: data1 },
    };

    axios(config)
      .then(function (response) {
        setChangelog([
          {
            ...Changelog,
            changeLog: data1,
          },
        ]);
        setSnackData({
          message: "Changelog Edit Successful",
          type: "success",
          open: true,
        });
        editClose();
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setSnackData({
          message: "Error Changelog Edit",
          type: "error",
          open: true,
        });
        setDisable(false);
      });
  }

  useEffect(() => {
    getAllChangelog();
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
        CHANGE LOG MANAGEMENT
      </Typography>
      <div className={classes.tableContainer}>
        <MaterialTable
          style={{ boxShadow: "none", border: "1px solid 	#E8E8E8" }}
          isLoading={pageLoading}
          title=""
          columns={[
            {
              title: "Change Log",
              field: "changelog",
              cellStyle: {
                minWidth: 300,
              },
              render: (data) => (
                <div>
                  {data.changeLog.map((ele, i) => (
                    <>
                      <p key={"item-" + ele + Math.random()}>{ele}</p>
                      <br />
                    </>
                  ))}
                </div>
              ),
            },
          ]}
          data={Changelog}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Changelog",
              onClick: (e, data) => {
                setActionId(data._id);
                var temp = "";
                data.changeLog.forEach((ele) => {
                  temp += ele + "\n";
                });
                setValue("changelog", temp);
                editOpen();
              },
              iconProps: {
                style: { color: "#7fbfbf" },
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            exportFileName: "Changelog",
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
              Edit Changelog
            </Typography>
            <div className={classes.modalForm}>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  editChangelog(data);
                })}
              >
                <TextField
                  variant={"outlined"}
                  multiline
                  label="Change Log"
                  fullWidth
                  rows={16}
                  className={classes.formItem}
                  InputLabelProps={{ shrink: true }}
                  {...register("changelog", {
                    required: "Changelog Required",
                    pattern: {
                      value: /^[a-zA-Z0-9?_. -]{10,}$/m,
                      message: "Invalid Changelog",
                    },
                  })}
                  error={Boolean(errors.changelog)}
                  helperText={errors.changelog?.message}
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
                    Edit Changelog
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
    </div>
  );
}

export default AdminChangelogManagement;
