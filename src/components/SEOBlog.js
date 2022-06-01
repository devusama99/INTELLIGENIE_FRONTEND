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
import Progress from "./ButtonLoader";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FiZap as OutputIcon,
  FiClock as HistoryIcon,
  FiClipboard as ClipboardIcon,
  FiStar as FavouriteIcon,
  FiFlag as FlagIcon,
  FiTrash as DeleteIcon,
} from "react-icons/fi";
import { Pie, PieChart } from "recharts";
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
    padding: theme.spacing(5),
    paddingTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
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
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey.dark}`,
    maxHeight: "70vh",
    overflowY: "auto",
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
  outlineList: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1.1),
  },
  outlineListItem: {
    paddingTop: theme.spacing(1),

    color: theme.palette.dark.main,
  },
  green: {
    color: theme.palette.primary.main,
  },
  red: {
    color: theme.palette.danger.main,
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

function SEOBlog() {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [disable, setDisable] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const [seo, setSeo] = useState();
  const [blogHistory, setBlogHistory] = useState([]);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const { REACT_APP_PYTHON_BACKEND: PYTHON_BACKEND } = process.env;

  //   Tabs Methods
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function seoBlog(data) {
    setDisable(true);
    const value = {
      focus_keyword: data.keyword,
      meta_description: data.meta,
      content: data.outlines.split("\n").map((ele) => ele.trim()),
      title: data.title,
    };
    console.log(value);
    var config = {
      method: "post",
      url: `${PYTHON_BACKEND}/app/checkSEOofContent`,
      headers: {
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios(config)
      .then(function (response) {
        setSeo(JSON.parse(response.data));
        setDisable(false);
      })
      .catch(function (error) {
        console.log(error);
        setDisable(false);
      });
  }
  function getcolor(item) {
    if (item == "Bad SEO score") {
      return "red";
    } else if (item == "Good SEO score") {
      return "green";
    } else {
      return "#777";
    }
  }
  return (
    <>
      <PageHead title={"SEO Blog"} />
      <div className={classes.container}>
        <div className={classes.inputForm}>
          <form
            style={{ width: "100%" }}
            noValidate
            onSubmit={handleSubmit((data) => {
              seoBlog(data);
            })}
          >
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              fullWidth
              label={"Focus Keyword"}
              name="firstName"
              className={[classes.textFeild, classes.formItem].join(" ")}
              {...register("keyword", {
                required: "Keyword required",
                pattern: {
                  value: /^[a-zA-Z0-9.,? ]*$/,
                  message: "Invalid Keyword",
                },
              })}
              error={Boolean(errors.keyword)}
              helperText={errors.keyword?.message}
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              color={"primary"}
              fullWidth
              label={"Blog Title"}
              className={[classes.textFeild, classes.formItem].join(" ")}
              {...register("title", {
                required: "Title required",
                pattern: {
                  value: /^[a-zA-Z0-9.,? ]*$/,
                  message: "Invalid Title",
                },
              })}
              error={Boolean(errors.title)}
              helperText={errors.keywords?.title}
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              multiline
              color={"primary"}
              label={"Meta Description"}
              rows="4"
              className={[classes.textFeild, classes.formItem].join(" ")}
              {...register("meta", {
                required: "Meta Description required",
              })}
              error={Boolean(errors.meta)}
              helperText={errors.meta?.message}
              fullWidth
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              multiline
              color={"primary"}
              label={"Content"}
              rows="10"
              className={[classes.textFeild, classes.formItem].join(" ")}
              name="lastName"
              {...register("outlines", {
                required: "Content required",
                // pattern: {
                //   value: /^[a-zA-Z0-9,.? \n]*$/,
                //   message: "Invalid Outlines",
                // },
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
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <div className={classes.cardsContainer}>
              {seo?.length ? (
                <Card className={classes.outputCard}>
                  <Typography
                    variant={"body2"}
                    className={classes.cardTime}
                    gutterBottom
                  >
                    Just Now
                  </Typography>
                  <ul>
                    {seo.map((item) => (
                      <li>
                        <Typography
                          style={{ color: getcolor(item.Result) }}
                          variant={"body2"}
                          gutterBottom
                        >
                          {item.text}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <Typography variant="h6">No Data To Show</Typography>
              )}
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
        pageNo="5"
        backLink="/app/seoAnalyzer"
        nextLink="/app/plagiarismChecker"
      />
    </>
  );
}
export default SEOBlog;
