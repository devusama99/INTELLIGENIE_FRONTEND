import { Button, Card, Typography, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import BoxContainerWhite from "./BoxContainerWhite";
import ProfileTemplate from "./ProfileTemplate";
import { FiMoreHorizontal as MoreIcon } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bolder",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
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
  cardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  card: {
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#E1F0F0",
    margin: theme.spacing(2) + "px " + theme.spacing(0) + "px",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: "49%",
      padding: theme.spacing(5),
    },
  },
  moreIcon: {
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
  cardHeading: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  displayFlexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBody: {
    textAlign: "justify",
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(4),
  },
}));

function BlogHistory() {
  const classes = useStyles();

  //   Menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.content}>
      <BoxContainerWhite>
        <Typography
          variant={"h5"}
          component={"h2"}
          className={classes.heading}
          gutterBottom
        >
          BLOG HISTORY
        </Typography>
        <div className={classes.cardsContainer}>
          <Card className={classes.card}>
            <div className={classes.displayFlexSpaceBetween}>
              <Typography variant={"h6"} className={classes.cardHeading}>
                Effects Of Global Warming
              </Typography>
              <Button
                size={"small"}
                aria-haspopup="true"
                onClick={handleClick}
                disableElevation
              >
                <MoreIcon className={classes.moreIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Remove</MenuItem>
                <MenuItem onClick={handleClose}>Downlaod</MenuItem>
              </Menu>
            </div>
            <Typography variant={"body2"} className={classes.cardBody}>
              Ea eu velit aliquip occaecat occaecat exercitation ipsum duis do
              non eiusmod quis excepteur do. t. Irure ullamco nostrud occaecat
              id. Nulla pariatur ut cupidatat aute sint id. Do veniam ad sunt
              non ad. Mollit consectetur cillum eu Lorem aliqua occaecat eu
              nostrud ut cupidatat ea sit. Sit commodo elit proident magna
              dolore tempor eu velit et eiusmod. Dolor fugiat adipisicing
              ullamco velit officia aliquip do irure labore sint. int et nulla
              est occaecat duis. Labore non officia ad enim nulla magna
              consectetur adipisicing. Ad exercitation quis laborum. o veniam ad
              sunt non ad. Mollit consectetur cillum eu Lorem aliqua occaecat eu
              nostrud ut cupidatat ea sit. Lorem aliqua occaecat eu nostrud ut
              cupidatat ea sit
            </Typography>
          </Card>
          <Card className={classes.card}>
            <div className={classes.displayFlexSpaceBetween}>
              <Typography variant={"h6"} className={classes.cardHeading}>
                Effects Of Global Warming
              </Typography>
              <Button
                size={"small"}
                aria-haspopup="true"
                onClick={handleClick}
                disableElevation
              >
                <MoreIcon className={classes.moreIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Remove</MenuItem>
                <MenuItem onClick={handleClose}>Download</MenuItem>
              </Menu>
            </div>
            <Typography variant={"body2"} className={classes.cardBody}>
              Ea eu velit aliquip occaecat occaecat exercitation ipsum duis do
              non eiusmod quis excepteur do. t. Irure ullamco nostrud occaecat
              id. Nulla pariatur ut cupidatat aute sint id. Do veniam ad sunt
              non ad. Mollit consectetur cillum eu Lorem aliqua occaecat eu
              nostrud ut cupidatat ea sit. Sit commodo elit proident magna
              dolore tempor eu velit et eiusmod. Dolor fugiat adipisicing
              ullamco velit officia aliquip do irure labore sint. int et nulla
              est occaecat duis. Labore non officia ad enim nulla magna
              consectetur adipisicing. Ad exercitation quis laborum. o veniam ad
              sunt non ad. Mollit consectetur cillum eu Lorem aliqua occaecat eu
              nostrud ut cupidatat ea sit. Lorem aliqua occaecat eu nostrud ut
              cupidatat ea sit
            </Typography>
          </Card>
        </div>
        <Pagination
          variant={"outlined"}
          color={"primary"}
          count={10}
          size={"small"}
          className={classes.pagination}
        />
      </BoxContainerWhite>
    </div>
  );
}

export default BlogHistory;
