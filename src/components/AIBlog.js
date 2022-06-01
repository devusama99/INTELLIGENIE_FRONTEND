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

function AIBlog() {
  const classes = useStyles();

  //   Tabs Methods
  const [value, setValue] = useState(0);

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

  const [blog, setBlog] = useState();
  const [blogHistory, setBlogHistory] = useState([]);
  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  function getBlog(data) {
    const keywords = data.keywords.split(",").map((ele) => ele.trim());
    const outlines = data.outlines.split("\n").map((ele) => ele.trim());
    setDisable(true);
    setSnackData({ ...snackData, open: false });
    console.log(data);
    var config = {
      method: "post",
      url: `${PYTHON_BACKEND}/app/generateBlog`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { outlines, keywords },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.parse(response.data));
        setDisable(false);
        setBlog(JSON.parse(response.data));
        setBlogHistory([...blogHistory, JSON.parse(response.data)]);
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

      <PageHead title={"AI Blog"} />
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
              color={"primary"}
              fullWidth
              label={"Keywords"}
              name="firstName"
              className={[classes.textFeild, classes.formItem].join(" ")}
              {...register("keywords", {
                required: "Keywords required",
                pattern: {
                  value: /^[a-zA-Z0-9.,? ]*$/,
                  message: "Invalid Keywords",
                },
              })}
              error={Boolean(errors.keywords)}
              helperText={errors.keywords?.message}
            ></TextField>
            <TextField
              variant={"outlined"}
              InputLabelProps={{ shrink: true }}
              size={"medium"}
              multiline
              color={"primary"}
              label={"Outlines"}
              rows="10"
              className={[classes.textFeild, classes.formItem].join(" ")}
              name="lastName"
              {...register("outlines", {
                required: "Outlines required",
                pattern: {
                  value: /^[a-zA-Z0-9,.? \n]*$/,
                  message: "Invalid Outlines",
                },
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
              {blog ? (
                <Card className={classes.outputCard}>
                  <Typography
                    variant={"body2"}
                    className={classes.cardTime}
                    gutterBottom
                  >
                    Just Now
                  </Typography>
                  {console.log(typeof blog)}
                  {blog.map((item) => (
                    <>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardResult}
                      >
                        {item.outline}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {item.data}
                      </Typography>
                    </>
                  ))}
                </Card>
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
          <TabPanel
            value={value}
            index={1}
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            {blogHistory?.length ? (
              blogHistory.map((blog) => (
                <Card className={classes.outputCard}>
                  <Typography
                    variant={"body2"}
                    className={classes.cardTime}
                    gutterBottom
                  >
                    Just Now
                  </Typography>
                  {blog.map((item) => (
                    <>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardResult}
                      >
                        {item.outline}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {item.data}
                      </Typography>
                    </>
                  ))}

                  <div className={classes.btnsContainer}>
                    {/* <div>
                      <CopyToClipboard text="item.data">
                        <IconButton className={classes.cardBtn}>
                          <ClipboardIcon />
                        </IconButton>
                      </CopyToClipboard>
                    </div> */}
                  </div>
                </Card>
              ))
            ) : (
              <Typography
                variant="h6"
                gutterBottom
                className={classes.cardResult}
              >
                {console.log(blogHistory)}
                No Data to Show
              </Typography>
            )}
          </TabPanel>
        </div>
      </div>
      <PageFoot
        nextLink="/app/seoAnalyzer"
        backLink="/app/blogOutline"
        pageNo="3"
      />
    </div>
  );
}
export default AIBlog;
