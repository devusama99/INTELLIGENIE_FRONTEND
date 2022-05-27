import PaymentSubscriptionTemplate from "./PaymentSubscriptionTemplate";
import {
  Typography,
  Button,
  Backdrop,
  Modal,
  TextField,
  Fade,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import BoxContainerWhite from "./BoxContainerWhite";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  content: {
    width: "98.5%",
    boxSizing: "border-box",
    margin: theme.spacing(7),

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "90%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4),
    },
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeading: {
    fontWeight: "bold",
    color: theme.palette.dark.main,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  primaryAddressContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(5),
    },
  },
  miniHeading: {
    fontSize: "12px",
    // marginTop: theme.spacing(2),
    color: theme.palette.dark.main,
  },
  headingContent: {
    fontSize: "16px",
    marginBottom: theme.spacing(2),
  },
  mb0: {
    marginBottom: 0,
  },
  displayFlex: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  ml2: {
    marginLeft: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(8),
    },
  },
  btnbg: {
    backgroundImage: `linear-gradient(95.47deg, #0067B1 0.51%, #008181 99.64%)`,
    boxShadow: "none",
    color: theme.palette.light.main,
  },
  btnright: {
    alignSelf: "flex-end",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "flex-start",
      marginTop: theme.spacing(1),
    },
  },
  address: {
    backgroundColor: "#E1F0F0",
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
    padding: theme.spacing(2.5),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
    },
  },
  addressContainer: {
    width: "70%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(0),
    },
  },

  mdDisplayNone: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  lgDisplayNone: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  dFlex: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  table: {
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

function BillingDetails() {
  const classes = useStyles();

  //   Add User Modal methods
  const [addAddress, setAddAddress] = useState(false);

  const addOpen = () => {
    setAddAddress(true);
  };

  const addClose = () => {
    setAddAddress(false);
  };

  return (
    <div className={classes.content}>
      <BoxContainerWhite>
        <Typography
          color={"primary"}
          variant={"h5"}
          className={classes.heading}
        >
          BILLING DETAILS
        </Typography>
        <div>
          <div className={classes.dFlex}>
            <div className={classes.primaryAddressContainer}>
              <Typography
                className={classes.subHeading}
                variant={"h6"}
                gutterBottom
              >
                Primary Address
              </Typography>
              <Typography className={classes.miniHeading}>Email</Typography>
              <Typography className={classes.headingContent} color={"primary"}>
                usama1234@xyz.com
              </Typography>

              <Typography className={classes.miniHeading}>Phone No</Typography>
              <Typography className={classes.headingContent} color={"primary"}>
                +923120535200
              </Typography>
              <Typography className={classes.miniHeading}>Address</Typography>
              <Typography
                className={[classes.headingContent, classes.mb0].join(" ")}
                color={"primary"}
              >
                Flat No JJ-12/8 APF Colony PAC Kamra District Attock
              </Typography>
              <div className={classes.displayFlex}>
                <span>
                  <Typography className={classes.miniHeading}>
                    Country
                  </Typography>
                  <Typography
                    className={classes.headingContent}
                    color={"primary"}
                  >
                    Pakistan
                  </Typography>
                </span>
                <span className={classes.ml2}>
                  <Typography className={classes.miniHeading}>
                    Zip Code
                  </Typography>
                  <Typography
                    className={classes.headingContent}
                    color={"primary"}
                  >
                    5845
                  </Typography>
                </span>
              </div>
              <Button
                variant="contained"
                disableElevation
                className={[classes.btnright, classes.btnbg].join(" ")}
                onClick={addOpen}
              >
                Add New Address
              </Button>
            </div>
            <MaterialTable
              style={{
                boxShadow: "none",
                border: "1px solid 	#E8E8E8",
                marginTop: "50px",
              }}
              title=" "
              columns={[
                { title: "Email", field: "email" },
                { title: "Phone No", field: "phoneNo" },
                {
                  title: "Address",
                  field: "address",
                  cellStyle: {
                    width: "40%",
                    minWidth: "250px",
                  },
                },
                { title: "Country", field: "country" },
                {
                  title: "Zip Code",
                  field: "zipCode",
                },
              ]}
              data={[
                {
                  email: "sidra000@gmail.com",
                  phoneNo: "+923120535255",
                  address:
                    "Flat No JJ-12/8 APF Colony PAC Kamra District Attock",
                  country: "Pakistan",
                  zipCode: "5226",
                },
                {
                  email: "arsalan1212@gmail.com",
                  phoneNo: "+9231205058555",
                  address:
                    "Flat No JJ-18/8 ARF Colony PAC Kamra District Attock",
                  country: "Pakistan",
                  zipCode: "5226",
                },
                {
                  email: "usama6934@gmail.com",
                  phoneNo: "+923130735255",
                  address:
                    "Flat No JJ-18/8 MRF Colony PAC Kamra District Attock",
                  country: "Pakistan",
                  zipCode: "5226",
                },
              ]}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit Address",
                  // onClick: handleOpen,
                  iconProps: {
                    style: { color: "#7fbfbf" },
                  },
                },
                {
                  icon: "delete",
                  tooltip: "Delete Address",
                  onClick: (event, rowData) =>
                    alert("You want to delete " + rowData.name),
                  iconProps: {
                    style: { color: "#7fbfbf" },
                  },
                },
                {
                  icon: "add",
                  tooltip: "Make Primary Address",
                  iconProps: {
                    style: { color: "#7fbfbf" },
                  },
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true,
                exportFileName: "Billing Adresses",
                headerStyle: {
                  backgroundColor: "#7FBFBF",
                  color: "#444",
                },
              }}
            />
          </div>
        </div>
        <Modal
          aria-labelledby="Add Sub User"
          aria-describedby="Add Account of a sub user"
          className={classes.modal}
          open={addAddress}
          onClose={addClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Fade in={addAddress}>
            <div className={classes.paper}>
              <Typography
                variant={"h5"}
                color={"primary"}
                id="transition-modal-title"
              >
                Add New Address
              </Typography>
              <div className={classes.modalForm}>
                <div className={classes.modalForm}>
                  <TextField
                    required
                    fullWidth
                    variant={"standard"}
                    label={"Email"}
                    className={classes.formItem}
                  />
                  <TextField
                    required
                    fullWidth
                    variant={"standard"}
                    label={"Phone Number"}
                    className={classes.formItem}
                  />
                  <TextField
                    required
                    fullWidth
                    variant={"standard"}
                    label={"Address"}
                    className={classes.formItem}
                  />
                  <TextField
                    required
                    fullWidth
                    variant={"standard"}
                    label={"Country"}
                    className={classes.formItem}
                  />
                  <TextField
                    required
                    fullWidth
                    variant={"standard"}
                    label={"Zip Code"}
                    className={classes.formItem}
                  />
                  <Button
                    className={classes.formItem}
                    variant={"contained"}
                    color={"primary"}
                    disableElevation
                  >
                    Save
                  </Button>
                  <Button
                    className={[classes.formItem, classes.ml3].join(" ")}
                    variant={"contained"}
                    onClick={addClose}
                    disableElevation
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </BoxContainerWhite>
    </div>
  );
}

export default BillingDetails;
