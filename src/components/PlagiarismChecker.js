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
import { Pie, PieChart, Cell } from "recharts";
import Progress from "./ButtonLoader";
import Snackbar from "./Snackbar";
import {
  FiZap as OutputIcon,
  FiClock as HistoryIcon,
  FiClipboard as ClipboardIcon,
  FiStar as FavouriteIcon,
  FiFlag as FlagIcon,
  FiTrash as DeleteIcon,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiCheckSquare } from "react-icons/fi";
import { useState } from "react";
import AppTemplate from "./AppTemplate";
import PageHead from "./PageHead";
import PageFoot from "./PageFoot";
import CopyToClipboard from "react-copy-to-clipboard";

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
    // backgroundColor: "#fff",
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
    maxHeight: "60vh",
    overflowY: "auto",
    marginBottom: theme.spacing(3),
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

function PlagiarismChecker() {
  const classes = useStyles();

  //   Tabs Methods
  const [value, setValue] = useState(0);

  const [percentage, setPercentage] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { REACT_APP_PYTHON_BACKEND: PYTHON_BACKEND } = process.env;

  const [disable, setDisable] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const [sources, setSources] = useState([])

  const [output, setOutput] = useState("");
  const [blog, setBlog] = useState();
  const [blogHistory, setBlogHistory] = useState([]);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const COLORS = ["#D22B2B", "#028181"];
  function getBlog(data) {
    setDisable(true);
    setSnackData({ ...snackData, open: false });
    console.log(data);
    const config = {
      method: "POST",
      url: "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host":
          "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
        "X-RapidAPI-Key": "db60fd54bamshee6955361247a3bp1c1ce5jsnadfe642a8566",
      },
      data: {
        text: data.outlines,
        language: "en",
        includeCitations: false,
        scrapeSources: false,
      },
    };
    var content = data.outlines;

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setSources(response.data.sources)
        setPercentage(response.data.percentPlagiarism);
        response.data.sources.forEach((parent) => {
          parent.matches.forEach((match) => {
            if (match.matchText.charAt(match.matchText.length - 1 == ".")) {
              content = content.replace(
                " " + match.matchText.substring(0, match.matchText.length - 3),
                `${" "}<span style="color:red">${match.matchText.substring(
                  0,
                  match.matchText.length - 3
                )}</span>${" "}`
              );
            } else {
              content = content.replace(
                " " + match.matchText,
                `${" "}<span style="color:red">${match.matchText}</span>${" "}`
              );
            }
          });
        });
        setOutput(content);
        setDisable(false);
        // setBlog(JSON.parse(response.data));
        // setBlogHistory([...blogHistory, JSON.parse(response.data)]);
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
        setSnackData({
          type: "error",
          message: "Error calling request",
          open: false,
        });
      });
  }
  return (
    <div>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />

      <PageHead title={"Plagiarism Checker"} />
      <div className={classes.container}>
        <div className={classes.inputForm}>
          <form
            style={{ width: "100%" }}
            noValidate
            onSubmit={handleSubmit((data) => {
              getBlog(data);
            })}
          >
           
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              multiline
              color={"primary"}
              label={"Content"}
              rows="15"
              className={[classes.textFeild, classes.formItem].join(" ")}
              name="lastName"
              {...register("outlines", {
                required: "Content required",
              })}
              error={Boolean(errors.outlines)}
              helperText={errors.outlines?.message}
              fullWidth
            ></TextField>

            <Box className={classes.btnGroup}>
              <Button
                variant={"contained"}
                color="primary"
                size="large"
                type="submit"
                disabled={disable}
                disableElevation
              >
                Generate
                {disable ? <Progress color="primary" size={20} /> : ""}
              </Button>
            </Box>
          </form>
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
              {/* <Tab
                label={
                  <div className={classes.TabIconContent}>
                    <HistoryIcon className={classes.tabIcon} />
                    <Typography variant="body2" className={classes.ml1}>
                      History
                    </Typography>
                  </div>
                }
              /> */}
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <div className={classes.cardsContainer}>
              {output?.length ? (
                <>
                  <Card className={classes.outputCard}>
                    <Typography
                      variant={"body2"}
                      className={classes.cardTime}
                      gutterBottom
                    >
                      Just Now
                    </Typography>

                    <Typography
                      variant="body1"
                      gutterBottom
                      dangerouslySetInnerHTML={{ __html: output }}
                    ></Typography>
                  </Card>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PieChart width={100} height={100}>
                      <Pie
                        data={[
                          {
                            name: "Plagarized",
                            value: percentage,
                            color: "red",
                          },
                          {
                            name: "Not Plagarized",
                            value: 100 - percentage,
                            color: "#008080",
                          },
                        ]}
                        nameKey={"name"}
                        innerRadius={20}
                      >
                        {new Array(2).fill(null).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div>
                      <Typography style={{ color: COLORS[0] }}>
                        {percentage}% Plagarized
                      </Typography>
                      <Typography style={{ color: COLORS[1] }}>
                        {100 - percentage}% Unique
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <ul>
                      {console.log(sources)}
                      {sources.length ? 
                      sources.map(ele => <li><a href={ele.url} target="_blank">{ele.url}</a></li>)
                       : null}
                    </ul>
                  </div>

                </>
              ) : (
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.cardResult}
                >
                  No Data to Show
                </Typography>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
      <PageFoot
        nextLink="/app/rephraser"
        backLink="/app/seoBlog"
        pageNo="6"
      />
    </div>
  );
}
export default PlagiarismChecker;
