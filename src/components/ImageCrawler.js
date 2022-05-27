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
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import Snackbar from "./Snackbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import Progress from "./ButtonLoader";
import { saveAs } from "file-saver";
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
import { useEffect, useState } from "react";
import AppTemplate from "./AppTemplate";
import PageHead from "./PageHead";
import PageFoot from "./PageFoot";
import { MdDelete, MdEdit, MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  root: {
    maxWidth: 400,
    boxShadow: "none",
    border: "1px solid #ccc",
    margin: "20px",
    flexGrow: 1,
    marginLeft: "0px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: "0px",
    },
  },
  media: {
    height: 300,
    minWidth: 300,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 600,
    },
  },
  inputForm: {
    width: "75%",
    borderRight: "1px solid #ccc",
    minHeight: "500px",
    padding: theme.spacing(5),
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
    maxWidth: "500px",
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
    maxHeight: "172vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "row",
    },
  },
  imagesCards: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "start",

    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    //   alignItems: "center",
    // },
  },
  cardsContainer: {
    // overflowY: "scroll",
    width: "100%",
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(3),
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

function ImageCrawler() {
  const classes = useStyles();

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();

  const [actionDisable, setActionDisable] = useState(false);

  const { REACT_APP_BACKEND: BACKEND } = process.env;

  const [images, setImages] = useState([]);
  const [favimages, setfavimages] = useState([]);

  const [favAction, setFavAction] = useState(false);

  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });
  function getFavImages(data) {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewAllImages${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setfavimages(response.data);
      })
      .catch(function (error) {
        setSnackData({
          type: "error",
          message: "Error getting Favourites Images",
          open: false,
        });
      });
  }

  function getImages(data) {
    setSnackData({ ...snackData, open: false });
    setActionDisable(true);
    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/getUnsplashImages`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setImages([...response.data]);
        setActionDisable(false);
      })
      .catch(function (error) {
        setSnackData({
          type: "error",
          message: "Error getting images",
          open: false,
        });
        setActionDisable(false);
      });
  }

  function removeToFavourites(id) {
    setFavAction(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "delete",
      url: `${BACKEND}/userRouter/deleteImage${id}/user${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setfavimages([...favimages.filter((ele) => ele._id != id)]);
        setSnackData({
          type: "success",
          message: "Deleted to Favourites",
          open: false,
        });
      })
      .catch(function (error) {
        setFavAction(true);
        setSnackData({
          type: "error",
          message: "Error Deleting from Favourites",
          open: false,
        });
      });
  }
  function addToFavourites(link) {
    setFavAction(true);
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "post",
      url: `${BACKEND}/userRouter/starImage${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: { imagePath: link },
    };

    axios(config)
      .then(function (response) {
        setfavimages([response.data, ...favimages]);
        setFavAction(false);
      })
      .catch(function (error) {
        setFavAction(true);
        setSnackData({
          type: "error",
          message: "Error Adding to Favourites",
          open: false,
        });
        setFavAction(false);
      });
  }
  useEffect(() => {
    getFavImages();
  }, []);

  const downloadImage = (url) => {
    saveAs(url, "image.jpg"); // Put your image url here.
  };

  return (
    <div>
      <Snackbar
        open={snackData.open}
        type={snackData.type}
        message={snackData.message}
      />
      <PageHead title={"Image Crawler"} />
      <div className={classes.container}>
        <div className={classes.inputForm}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <form
              noValidate
              onSubmit={handleSubmit1((data) => {
                getImages(data);
              })}
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <TextField
                label={"Keyword"}
                variant={"outlined"}
                fullWidth
                className={classes.textFeild}
                InputLabelProps={{ shrink: true }}
                {...register1("search", {
                  required: "Keyword Required",
                  pattern: {
                    value: /^[a-zA-Z ]{3,}$/m,
                    message: "Invalid Keyword",
                  },
                })}
                error={Boolean(errors1.search)}
                helperText={errors1.search?.message}
              />
              <div className={classes.dFlexBetween}>
                <Button
                  style={{
                    marginLeft: "10px",
                    margin: "10px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                  variant={"contained"}
                  type="submit"
                  disableElevation
                  disabled={actionDisable}
                  color={"primary"}
                >
                  Search
                  {actionDisable ? <Progress color="primary" size={20} /> : ""}
                </Button>
              </div>
            </form>
          </div>
          <div className={classes.imagesCards}>
            {!images.length > 0 ? (
              <h4>No Images To Show</h4>
            ) : (
              images.map((ele, i) => (
                <Card key={"picture-" + i} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={ele}
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        downloadImage(ele);
                      }}
                    >
                      Download
                    </Button>
                    <div>
                      <IconButton onClick={() => addToFavourites(ele)}>
                        <MdFavorite />
                      </IconButton>
                      <Link
                        to={`imageEditor`}
                        style={{
                          margin: 0,
                          padding: 0,
                          textDecoration: "none",
                        }}
                      >
                        <IconButton
                          onClick={() => localStorage.setItem("imageEdit", ele)}
                        >
                          <MdEdit />
                        </IconButton>
                      </Link>
                    </div>
                  </CardActions>
                </Card>
              ))
            )}
          </div>
        </div>
        <div className={classes.outputContainer}>
          <div className={classes.cardsContainer}>
            <h4
              style={{
                textAlign: "start",
                marginTop: "20px",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              Favoruites
              {console.log(favimages)}
            </h4>
            {!favimages.length > 0 ? (
              <h6 style={{ width: "100%", marginBottom: "30px" }}>
                No Images To Show
              </h6>
            ) : (
              favimages.map((ele, i) => (
                <Card key={"picture-favoruite-" + i} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={ele.imagePath}
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        downloadImage(ele.imagePath);
                      }}
                    >
                      Download
                    </Button>

                    <IconButton onClick={() => removeToFavourites(ele._id)}>
                      <MdDelete />
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            )}
          </div>
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
export default ImageCrawler;
