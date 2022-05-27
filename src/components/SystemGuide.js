import {
  Button,
  Card,
  makeStyles,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import YouTube from "react-youtube";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    boxSizing: "border-box",
    margin: theme.spacing(5.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

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
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
  guideHeading: {
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
    },
  },
  videoGuide: {
    display: "flex",
    flexWrap: "wrap",
  },
  videoHeading: {
    color: theme.palette.dark.main,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  manualContainer: {
    flexGrow: "1",
    width: "300px",
    minHeight: "150px",
    margin: theme.spacing(2.5),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.light}`,
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
  videoContainer: {
    position: "relative",
  },
  loadingVideo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    zIndex: 0,
  },
  video: {
    zIndex: 5,
  },
  changelogList: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2.2),
    },
  },
  listItem: {
    fontSize: "16px",
    paddingTop: theme.spacing(0.6),
    paddingBottom: theme.spacing(0.6),
    color: theme.palette.dark.main,
  },
  displayFlex: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

function SystemGuide() {
  const classes = useStyles();

  const { REACT_APP_BACKEND: BACKEND } = process.env;

  const [loader, setLoader] = useState(true);

  const [changeLog, setChangeLog] = useState([]);
  const [systemVideos, setSystemVideos] = useState([]);

  function videoReady(e) {
    setLoader(false);
  }

  function getChangeLog() {
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewChangeLog`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.changeLog);
        setChangeLog(response.data.changeLog);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getSystemVideos() {
    var config = {
      method: "get",
      url: `${BACKEND}/adminRouter/viewVideos`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setSystemVideos(response.data.systemVideo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getChangeLog();
    getSystemVideos();
  }, []);

  return (
    <div className={classes.content}>
      <Typography variant="h2" component={"h2"} className={classes.heading}>
        SYSTEM GUIDE
      </Typography>
      <Typography variant="h6" className={classes.guideHeading}>
        Video Guides
      </Typography>
      <div className={classes.videoGuide}>
        {systemVideos.length > 0 ? (
          systemVideos.map((ele) => {
            return (
              <div className={classes.manualContainer}>
                <Typography
                  variant="body2"
                  component={"h5"}
                  className={classes.videoHeading}
                >
                  {ele.title}
                </Typography>
                <div className={classes.videoContainer}>
                  {loader ? (
                    <div className={classes.loadingVideo}>
                      <CircularProgress />
                    </div>
                  ) : null}
                  <div className={classes.video}>
                    <YouTube
                      videoId={ele.URL.split("=")[1]}
                      opts={{
                        width: "100%",
                        height: "180",
                      }}
                      onReady={(e) => {
                        setLoader(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.displayFlex}>
            <CircularProgress size={30} color="primary" />
          </div>
        )}
      </div>
      <Typography variant="h6" className={classes.guideHeading}>
        Change Logs
      </Typography>
      <div className={classes.changelogList}>
        <ul>
          {changeLog.length > 0 ? (
            changeLog.map((ele, i) => (
              <li key={"item" + i} className={classes.listItem}>
                {ele}
              </li>
            ))
          ) : (
            <div className={classes.displayFlex}>
              <CircularProgress size={30} color="primary" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SystemGuide;
