import React, { useEffect } from "react";
import Logo from "./img/Logo.svg";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  FiThumbsUp as FeedbackIcon,
  FiHelpCircle as QueryIcon,
  FiAlertTriangle as ComplaintIcon,
  FiFileText as SystemGuideIcon,
  FiShare2 as ShareIcon,
} from "react-icons/fi";
import {
  MdInfoOutline,
  MdLogout as SignoutIcon,
  MdOutlineQuestionAnswer,
  MdQuestionAnswer,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Helper/ClearLocalStorage";
import { useHistory } from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f2f8f8",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  listItem: {
    padding: "10px 40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemActive: {
    padding: "10px 40px",
    color: theme.palette.light.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    borderRadius: theme.shape.borderRadius,
  },
  appBar: {
    backgroundImage: "linear-gradient(90deg, #0067B1 0%, #008181 100%)",
    zIndex: "100",
    padding: "0px !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0),
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    zIndex: 0,
    width: drawerWidth,
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  drawerPaper1: {
    width: drawerWidth,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  content: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    margin: "20px",
    marginRight: "0px",
    paddingLeft: drawerWidth - 20 + "px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      margin: 0,
    },
  },
  navItemIcon: {
    marginRight: "10px",
    color: theme.palette.dark.main,
  },
  navItemIconActive: {
    marginRight: "10px",
    color: theme.palette.light.main,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(0.7),
  },
  navScreen: {
    marginTop: "65px",
    width: "100%",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  SignoutBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.light.main,
    margin: "0px 10px",
    borderRadius: theme.shape.borderRadius,
    backgroundImage: ` linear-gradient(93.12deg, ${theme.palette.secondary.main} 1.28%, ${theme.palette.primary.main} 99.48%)`,
  },
  signoutIcon: {
    marginLeft: theme.spacing(1),
    color: theme.palette.light.main,
    fontWeight: "bolder",
  },

  width100: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Logo: {
    height: "25px",
    color: theme.palette.light.main,
    paddingTop: theme.spacing(0.3),

    [theme.breakpoints.down("xs")]: {
      transform: "scale(0.8) translateY(0px)",
    },
  },
  avatarBtn: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function FeedbackHelpTemplate(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();

  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/feedbackHelpCenter" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/feedbackHelpCenter"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <FeedbackIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/feedbackHelpCenter"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Ratings and Feedback"} />
          </ListItem>
        </Link>
        <Link to="/feedbackHelpCenter/complaint" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/feedbackHelpCenter/complaint"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <ComplaintIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/feedbackHelpCenter/complaint"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Complaint and Response"} />
          </ListItem>
        </Link>
        <Link to="/feedbackHelpCenter/query" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/feedbackHelpCenter/query"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <MdOutlineQuestionAnswer
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/feedbackHelpCenter/query"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Query and Response"} />
          </ListItem>
        </Link>

        <Link className={classes.link} to={"/feedbackHelpCenter/systemGuide"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/feedbackHelpCenter/systemGuide"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <SystemGuideIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/feedbackHelpCenter/systemGuide"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"System Guide"} />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/feedbackHelpCenter/FAQsShareApp"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/feedbackHelpCenter/FAQsShareApp"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <ShareIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/feedbackHelpCenter/FAQsShareApp"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"FAQs and Share App"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const history = useHistory();
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar className={classes.appBar}>
        <div className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to={"/app"}>
            <img src={Logo} alt="Logo" className={classes.Logo} />
          </Link>
          <div className={classes.settings}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              className={classes.avatarBtn}
              color="inherit"
            >
              <Avatar
                src={JSON.parse(localStorage.getItem("user")).profilePicture}
              />
            </IconButton>
            <Menu
              className={classes.menu}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link to={"/feedbackHelpCenter"} className={classes.link}>
                <MenuItem className={classes.width100} onClick={handleClose}>
                  Feedback and Help Center
                </MenuItem>
              </Link>
              <Link to={"/subscription"} className={classes.link}>
                <MenuItem className={classes.width100} onClick={handleClose}>
                  Payment and Subscription
                </MenuItem>
              </Link>
              <Link to={"/account"} className={classes.link}>
                <MenuItem onClick={handleClose} className={classes.width100}>
                  Account Settings
                </MenuItem>
              </Link>
              <div className={classes.link}>
                <MenuItem
                  className={[classes.width100, classes.SignoutBtn].join(" ")}
                  onClick={() => {
                    handleClose();
                    logout(history);
                  }}
                >
                  Sign out
                  <SignoutIcon className={classes.signoutIcon} />
                </MenuItem>
              </div>
            </Menu>
          </div>
        </div>
      </AppBar>
      <div className={classes.navScreen}>
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={classes.drawerPaper1}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        <nav>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>{props.children}</main>
      </div>
    </div>
  );
}

export default FeedbackHelpTemplate;
