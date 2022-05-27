import React from "react";
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
import { Container } from "@material-ui/core";
import {
  FiHome as DashboardIcon,
  FiUser as UserManagementIcon,
  FiPenTool as FeedbackManagementIcon,
  FiFeather as ComplaintManagementIcon,
} from "react-icons/fi";
import {
  RiQuestionAnswerLine,
  RiNewspaperLine,
  RiQuestionnaireLine,
} from "react-icons/ri";
import {
  MdLogout as SignoutIcon,
  MdOutlineVideoSettings,
} from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { logoutAdmin } from "./Helper/ClearLocalStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  // toolbar: theme.mixins.toolbar,
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
    minHeight: "85vh",
    margin: "20px",
    marginRight: "20px",
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
  setting: {
    padding: "0px",
  },
  drawerContainer: {
    marginTop: theme.spacing(8),
  },

  avatarBtn: {
    paddingLeft: "0",
    paddingRight: "0",
  },
}));

function ProfileTemplate(props) {
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
        <Link to="/admin" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <DashboardIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Dashboard"} />
          </ListItem>
        </Link>
        <Link to="/admin/userManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/userManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <UserManagementIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/userManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"User Management"} />
          </ListItem>
        </Link>
        <Link to="/admin/feedbackManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/feedbackManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <FeedbackManagementIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/feedbackManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Feedback Management"} />
          </ListItem>
        </Link>
        <Link to="/admin/complaintManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/complaintManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <ComplaintManagementIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/complaintManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Complaint Management"} />
          </ListItem>
        </Link>
        <Link to="/admin/queryManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/queryManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <RiQuestionnaireLine
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/queryManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Query Management"} />
          </ListItem>
        </Link>

        <Link to="/admin/changelogManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/changelogManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <RiNewspaperLine
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/changelogManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Changelog Management"} />
          </ListItem>
        </Link>
        <Link to="/admin/faqsManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/faqsManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <RiQuestionAnswerLine
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/faqsManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"FAQs Management"} />
          </ListItem>
        </Link>
        <Link to="/admin/subscriptionManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/subscriptionManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <AiOutlineDollarCircle
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/subscriptionManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Subscriptions "} />
          </ListItem>
        </Link>
        <Link to="/admin/videosManagement" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/admin/videosManagement"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <MdOutlineVideoSettings
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/admin/videosManagement"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"System Videos"} />
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
          <Link to={"/admin"}>
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
              <Avatar />
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
              <Link to={"/admin/account"} className={classes.link}>
                <MenuItem onClick={handleClose} className={classes.width100}>
                  Account Settings
                </MenuItem>
              </Link>
              <div className={classes.link}>
                <MenuItem
                  className={[classes.width100, classes.SignoutBtn].join(" ")}
                  onClick={() => {
                    logoutAdmin(history);
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
          classes={{
            paper: classes.drawerPaper1,
          }}
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

export default ProfileTemplate;
