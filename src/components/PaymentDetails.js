import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CreditCardBG from "./img/CreditCardBG.svg";
import CreditCardChip from "./img/CreditCardChip.png";
import BoxContainerWhite from "./BoxContainerWhite";
import PaymentSubscriptionTemplate from "./PaymentSubscriptionTemplate";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { countries } from "./Counteries";

import StripeCheckout from "react-stripe-checkout";

const useStyles = makeStyles((theme) => ({
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

  heading: {
    textAlign: "center",
    fontWeight: "bold",
  },

  dFLex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  displayFLex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  paymentFormContainer: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  cardImgContainer: {
    width: "45%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  w45: {
    width: "48%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  btn: {
    backgroundImage: "linear-gradient(95.47deg, #0067B1 0.51%, #008181 99.64%)",
    color: theme.palette.light.main,
  },
  card: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "400px",
    },
  },
  cardchip: {
    position: "absolute",
    left: "30px",
    top: "35%",
    width: "15%",
  },
  cardName: {
    color: theme.palette.light.main,
    position: "absolute",
    top: "65%",
    left: "30px",
    letterSpacing: theme.spacing(0.4),
    fontFamily: "Arial",
  },
  cardNumber: {
    color: theme.palette.light.main,
    position: "absolute",
    top: "75%",
    left: "30px",
    letterSpacing: theme.spacing(0.4),
    fontFamily: "Arial",
  },
  cardTag: {
    color: theme.palette.light.main,
    position: "absolute",
    top: "15%",
    left: "30px",
    letterSpacing: theme.spacing(0.1),
    fontFamily: "Arial",
  },
  cardExpiry: {
    color: theme.palette.light.main,
    position: "absolute",
    top: "75%",
    right: "30px",
    letterSpacing: theme.spacing(0.4),
    fontFamily: "Arial",
  },
}));

function PaymentDetails() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  // MUI DATE
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  return (
    <div className={classes.content}>
      <BoxContainerWhite>
        <Typography
          color={"primary"}
          variant={"h5"}
          className={classes.heading}
        >
          PAYMENT DETAILS
        </Typography>

        {/* <StripeCheckout
          stripeKey="pk_test_51KNHplFWgdxiZurGXJT64530Z97PJFuKH1JZ7gdkIN8LlPkpnXAHYkTg77GwaihPK4pLIXrYSORatI2ebpzjhNbc00o7LSVDMY"
          token={sendPayment}
          name="Donate to campaign"
          amount={18 * 100}
        >
          <br />
          <br />
          <Button
            style={{
              width: "100%",
              backgroundColor: "#1B9834",
              color: "white",
            }}
          >
            You are donating {18}
          </Button>
        </StripeCheckout> */}
        <div className={classes.dFLex}>
          <div className={classes.paymentFormContainer}>
            <TextField
              label={"Name"}
              required
              variant={"standard"}
              fullWidth
              className={classes.mb3}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label={"Card Number"}
              required
              variant={"standard"}
              fullWidth
              className={classes.mb3}
              onChange={(e) => setCardNo(e.target.value)}
              value={cardNo}
            />
            <div className={classes.displayFLex}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required
                  label={"Expiration Date"}
                  openTo="year"
                  views={["year", "month"]}
                  variant={"standard"}
                  className={[classes.w45, classes.mb3].join(" ")}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <TextField
                label={"CVC"}
                required
                variant={"standard"}
                className={[classes.w45, classes.mb3].join(" ")}
                fullWidth
                onChange={(e) => setCvc(e.target.value)}
                value={cvc}
              />
            </div>
            <div className={classes.displayFLex}>
              <Autocomplete
                id="select"
                options={countries}
                getOptionLabel={(option) => option.label}
                className={classes.w45}
                onChange={(e, value) => {
                  setCountry(value?.label);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="standard"
                    className={classes.mb3}
                    value={country}
                    required
                  />
                )}
              />
              {/* <TextField
                label={"Country"}
                required
                variant={"standard"}
                fullWidth
                className={[classes.w45, classes.mb3].join(" ")}
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              /> */}
              <TextField
                label={"Zip Code"}
                required
                variant={"standard"}
                fullWidth
                className={[classes.w45, classes.mb3].join(" ")}
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
              />
            </div>
            <Button
              variant="contained"
              className={[classes.btn, classes.mb3].join(" ")}
            >
              Pay Now
            </Button>
          </div>
          <div className={classes.cardImgContainer}>
            <div className={classes.card}>
              <img
                src={CreditCardBG}
                className={classes.cardBG}
                alt="Credit Card"
              />
              <img
                src={CreditCardChip}
                className={classes.cardchip}
                alt="Credit Card Chip"
              />
              <Typography className={classes.cardTag} variant="body2">
                Credit Card
              </Typography>
              <Typography className={classes.cardName} variant="body2">
                {name === "" ? "Your Name Here" : name}
              </Typography>
              <Typography className={classes.cardNumber} variant="body2">
                {cardNo === "" ? "XXXX XXXX XXXX XXXX" : cardNo}
              </Typography>
              <Typography className={classes.cardExpiry} variant="body2">
                {selectedDate === ""
                  ? "mm/yy"
                  : selectedDate.getMonth() +
                    1 +
                    "/" +
                    selectedDate.getFullYear()}
              </Typography>
            </div>
          </div>
        </div>
      </BoxContainerWhite>
    </div>
  );
}

export default PaymentDetails;
