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
import { logout } from "./Helper/ClearLocalStorage";
import {
  FiUserCheck as UpdateProfileIcon,
  FiTrash as DeleteProfileIcon,
  FiUserPlus as AddSubUserIcon,
  FiClock as BlogHistoryIcon,
  FiFolder as OthersIcon,
} from "react-icons/fi";
import { MdLogout as SignoutIcon } from "react-icons/md";
import DotColored from "./DotColored";
import { Link, useLocation } from "react-router-dom";
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
    padding: "10px 48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemActive: {
    padding: "10px 48px",
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
      marginRight: theme.spacing(2),
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
        <Link to="/account" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/account"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <UpdateProfileIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/account"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Update Profile"} />
          </ListItem>
        </Link>
        <Link to="/account/delete" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/account/delete"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <DeleteProfileIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/account/delete"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Delete Profile"} />
          </ListItem>
        </Link>

        <Link to="/account/subusers" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/account/subusers"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <AddSubUserIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/account/subusers"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Manage Sub Users"} />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/account/blogHistory"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/account/blogHistory"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <BlogHistoryIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/account/blogHistory"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText primary={"Blog History"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem className={classes.listItem}>
          <ListItemIcon>
            <OthersIcon
              className={classes.navItemIcon}
              style={{ fontSize: 20 }}
            />
          </ListItemIcon>
          <ListItemText primary={"Others"} />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon style={{ height: "15px" }}>
            <DotColored color="#581B98" size={10} />
          </ListItemIcon>
          <ListItemText primary={"Favourites"} />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon style={{ height: "15px" }}>
            <DotColored color="#9C1DE7" size={10} />
          </ListItemIcon>
          <ListItemText primary={"Flagged"} />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon style={{ height: "15px" }}>
            <DotColored color="#F3558E" size={10} />
          </ListItemIcon>
          <ListItemText primary={"Trash"} />
        </ListItem>
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

export default ProfileTemplate;
