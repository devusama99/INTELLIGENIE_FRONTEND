import {
  makeStyles,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  IconButton,
} from "@material-ui/core";
import {
  FiZap as OutputIcon,
  FiClock as HistoryIcon,
  FiClipboard as ClipboardIcon,
  FiStar as FavouriteIcon,
  FiFlag as FlagIcon,
  FiTrash as DeleteIcon,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { FiCheckSquare } from "react-icons/fi";
import { useState } from "react";
import AppTemplate from "./AppTemplate";
import PageHead from "./PageHead";
import PageFoot from "./PageFoot";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  inputForm: {
    width: "50%",
    borderRight: `1px solid ${theme.palette.grey.main}`,
    minHeight: "500px",
    padding: theme.spacing(5),
    paddingTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      borderBottom: `1px solid ${theme.palette.grey.main}`,
      borderRight: `none`,
      width: "100%",
    },
  },
  textFeild: {
    backgroundColor: "#fff",
  },
  formItem: {
    marginBottom: theme.spacing(3),
  },
  btnMain: {
    backgroundImage: "linear-gradient(93.12deg, #0067B1 1.28%, #008080 99.48%)",
    color: theme.palette.light.main,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  outputContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardsContainer: {
    // overflowY: "scroll",
    paddingRight: theme.spacing(0.7),
    paddingLeft: theme.spacing(0.7),
  },
  tabCard: {
    width: "100%",
    backgroundColor: "#F3F8FA",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey.main}`,
  },
  TabIconContent: {
    display: "flex",
    alignItems: "center",
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  tabIcon: {
    fontSize: "16px",
  },
  outputCard: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey.dark}`,
  },
  cardTime: {
    color: theme.palette.grey.dark,
  },
  cardResult: {
    fontWeight: "bold",
    color: theme.palette.dark.main,
    fontSize: "18px",
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardBtn: {
    borderRadius: theme.shape.borderRadius,
    transform: "scale(0.8)",
    backgroundColor: theme.palette.grey.main,
    padding: theme.spacing(0.7),
  },
  historyText: {
    color: theme.palette.dark.main,
    fontSize: "18px",
    fontWeight: "bold",
  },

  keywordList: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1.1),
  },
  keywordListItem: {
    paddingTop: theme.spacing(1),
    color: theme.palette.dark.main,
  },
}));

// Nav Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function BlogKeywords() {
  const classes = useStyles();

  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  //   Tabs Methods
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <PageHead title={"Blog Keywords Suggestions"} />
      <div className={classes.container}>
        <div className={classes.inputForm}>
          <TextField
            label={"Title"}
            variant={"outlined"}
            fullWidth
            className={[classes.formItem, classes.textFeild].join(" ")}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <TextField
            className={[classes.formItem, classes.textFeild].join(" ")}
            multiline
            rows={12}
            label={"Description"}
            variant={"outlined"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            disableElevation
            className={classes.btnMain}
            endIcon={<FiCheckSquare />}
          >
            Generate
          </Button>
        </div>
        <div className={classes.outputContainer}>
          <Paper square className={classes.tabCard}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab
                label={
                  <div className={classes.TabIconContent}>
                    <OutputIcon className={classes.tabIcon} />
                    <Typography variant="body2" className={classes.ml1}>
                      Output
                    </Typography>
                  </div>
                }
              />
              <Tab
                label={
                  <div className={classes.TabIconContent}>
                    <HistoryIcon className={classes.tabIcon} />
                    <Typography variant="body2" className={classes.ml1}>
                      History
                    </Typography>
                  </div>
                }
              />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <div className={classes.cardsContainer}>
              <Card className={classes.outputCard}>
                <Typography
                  variant={"body2"}
                  className={classes.cardTime}
                  gutterBottom
                >
                  Just Now
                </Typography>
                <ul className={classes.keywordList}>
                  <li className={classes.keywordListItem}>BitCoin</li>
                  <li className={classes.keywordListItem}>AltCoin</li>
                  <li className={classes.keywordListItem}>BlockChain</li>
                  <li className={classes.keywordListItem}>CoinBase</li>
                  <li className={classes.keywordListItem}>Bitcoin Cash</li>
                  <li className={classes.keywordListItem}>Cold Wallet</li>
                  <li className={classes.keywordListItem}>Decentralization</li>
                  <li className={classes.keywordListItem}>Minning</li>
                </ul>
                <div className={classes.btnsContainer}>
                  <div>
                    <IconButton className={classes.cardBtn}>
                      <ClipboardIcon />
                    </IconButton>
                    <IconButton className={classes.cardBtn}>
                      <FavouriteIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton className={classes.cardBtn}>
                      <FlagIcon />
                    </IconButton>
                    <IconButton className={classes.cardBtn}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6" className={classes.historyText}>
              No History to show
            </Typography>
          </TabPanel>
        </div>
      </div>
      <PageFoot
        nextLink="/aiBLog"
        backLink="/blogOutline"
        pageNo="2"
        backDisabled={true}
      />
    </div>
  );
}
export default BlogKeywords;
