import { Card, makeStyles, Typography } from "@material-ui/core";
import PieChart from "./PieChart";
import CountUp from "react-countup";
import {
  FiUsers as TotalUsersIcon,
  FiArrowUp as NewUsersIcon,
  FiThumbsUp as AppRatingsIcon,
} from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  dashboardContent: {
    width: "100%",
    height: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  card: {
    padding: theme.spacing(3),
    height: "250px",
    border: `1px solid ${theme.palette.primary.light}`,
    flexGrow: 1,
    flexBasis: 0,
    margin: (0, theme.spacing(2)),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
    justifyContent: "space-between",
    boxShadow: "none",
    backgroundColor: "#ffff",
    [theme.breakpoints.down("xs")]: {
      flexGrow: 0,
      flexBasis: "auto",
      width: "100%",
    },
    "&:last-child": {
      marginRight: "0",
    },
  },
  dflex: {
    display: "flex",
    alignItems: "center",
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  cardIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: "bolder",
    transform: "scale(1.6)",
  },
  cardHeading: {
    fontWeight: "bold",
  },
  count: {
    fontSize: "64px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  cardDescription: {
    fontSize: "20px",
    textAlign: "center",
  },
  pieChart: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.dashboardContent}>
      <div className={classes.cardsContainer}>
        <Card className={classes.card}>
          <div className={classes.dflex}>
            <TotalUsersIcon className={classes.cardIcon} />
            <Typography
              variant="h6"
              color={"primary"}
              className={classes.cardHeading}
            >
              Total Users
            </Typography>
          </div>
          <CountUp
            end={16}
            duration={1.8}
            className={classes.count}
            useEasing={true}
          />
          <Typography
            variant="body2"
            className={classes.cardDescription}
            color="primary"
          >
            Total users registered till now
          </Typography>
        </Card>
        <Card className={classes.card}>
          <div className={classes.dflex}>
            <NewUsersIcon className={classes.cardIcon} />
            <Typography
              variant="h6"
              color={"primary"}
              className={classes.cardHeading}
            >
              New Users
            </Typography>
          </div>
          <CountUp
            end={36}
            duration={1.8}
            className={classes.count}
            useEasing={true}
          />
          <Typography
            variant="body2"
            className={classes.cardDescription}
            color="primary"
          >
            New registered users this month
          </Typography>
        </Card>
        <Card className={classes.card}>
          <div className={classes.dflex}>
            <AppRatingsIcon className={classes.cardIcon} />
            <Typography
              variant="h6"
              color={"primary"}
              className={classes.cardHeading}
            >
              App Rating
            </Typography>
          </div>
          <CountUp
            decimals={1}
            end={4.5}
            duration={1.8}
            className={classes.count}
            useEasing={true}
          />
          <Typography
            variant="body2"
            className={classes.cardDescription}
            color="primary"
          >
            Rating of app from users
          </Typography>
        </Card>
      </div>
      <div className={classes.pieChart}>
        <PieChart
          data={[
            { name: "Premium Package", value: 64, fill: "#008080" },
            { name: "Basic Package", value: 16, fill: "#BADCDC" },
            { name: "Free Package", value: 20, fill: "#7FBFBF" },
          ]}
        />
      </div>
      {/* <PieChart width={350} height={350}>
        <Pie
          data={[
            { name: "Premium Package", value: 64, fill: "#008080" },
            { name: "Basic Package", value: 16, fill: "#BADCDC" },
            { name: "Free Package", value: 20, fill: "#7FBFBF" },
          ]}
          nameKey={"name"}
          innerRadius={60}
          animationDuration={1000}
          animationBegin={0}
        >
          <LabelList
            dataKey="name"
            position="insideEnd"
            style={{
              fontSize: "12px",
              fill: "rgba(0, 0, 0, 0.87)",
              fontWeight: "100",
              letterSpacing: "1px",
            }}
          />
        </Pie>
      </PieChart> */}
    </div>
  );
}
export default AdminDashboard;
