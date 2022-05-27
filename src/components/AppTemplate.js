import React from "react";
import Logo from "./img/Logo.svg";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  FiHome as DashboardIcon,
  FiHelpCircle as BlogHelpIcon,
  FiAirplay as AiBlogIcon,
  FiCpu as AnalyzerIcon,
  FiActivity as SEOBlogIcon,
  FiAlertOctagon as PlagiarismIcon,
  FiImage as ImageCrawlerIcon,
  FiCode as HTMLCodeIcon,
  FiKey as KeywordsIcon,
} from "react-icons/fi";
import { MdLogout as SignoutIcon } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Helper/ClearLocalStorage";
import { useHistory } from "react-router-dom";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingRight: 0,
    backgroundColor: "#f2f8f8",
    width: "100%",
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
    paddingLeft: drawerWidth + "px",
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
  listItemTextActive: {
    color: theme.palette.light.main,
  },
  listItemText: {
    color: theme.palette.dark.main,
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
  navBar: {
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
    paddingLeft: "0",
    paddingRight: "0",
  },
  nested: {
    marginLeft: theme.spacing(4),
  },
}));

function AppTemplate(props) {
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

  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleClick = () => {
    setOpenDropdown(!openDropdown);
  };

  const location = useLocation();
  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/app" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              "/app" === location.pathname
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <DashboardIcon
              style={{ fontSize: 20 }}
              className={
                "/app" === location.pathname
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"Dashboard"}
              className={
                "/app" === location.pathname
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>

        <ListItem
          button
          className={
            "/app/blogTitle" === location.pathname ||
            "/app/blogOutline" === location.pathname
              ? classes.listItemActive
              : classes.listItem
          }
          onClick={() => {
            handleClick();
          }}
        >
          <BlogHelpIcon
            style={{ fontSize: 20 }}
            className={
              "/app/blogTitle" === location.pathname ||
              "/app/blogOutline" === location.pathname
                ? classes.navItemIconActive
                : classes.navItemIcon
            }
          />
          <ListItemText
            primary={"1-Blog Help"}
            className={
              "/app/blogTitle" === location.pathname ||
              "/app/blogOutline" === location.pathname
                ? classes.listItemTextActive
                : classes.listItemText
            }
          />
          {openDropdown ? (
            <ExpandLess
              className={
                "/app/blogTitle" === location.pathname ||
                "/app/blogOutline" === location.pathname
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
          ) : (
            <ExpandMore
              className={
                "/app/blogTitle" === location.pathname ||
                "/app/blogOutline" === location.pathname
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
          )}
        </ListItem>
        <Collapse in={openDropdown} timeout="auto" unmountOnExit>
          <Link to="/app/blogTitle" className={classes.link}>
            <ListItem
              selected={"/app/blogTitle" === location.pathname}
              button
              className={classes.listItem}
              onClick={() => {
                handleClick();
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={"Blog Title"} className={classes.nested} />
            </ListItem>
          </Link>
          <Link to="/app/blogOutline" className={classes.link}>
            <ListItem
              selected={"/app/blogOutline" === location.pathname}
              button
              className={classes.listItem}
              onClick={() => {
                handleClick();
                handleDrawerToggle();
              }}
            >
              <ListItemText
                primary={"Blog Outline"}
                className={classes.nested}
              />
            </ListItem>
          </Link>
        </Collapse>
        <Link to="/app/blogKeywords" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/blogKeywords"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <KeywordsIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/blogKeywords"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"2-Blog Keywords"}
              className={
                location.pathname === "/app/blogKeywords"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>

        <Link to="/app/aiBlog" className={classes.link}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/aiBlog"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <AiBlogIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/aiBlog"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"3-AI Blog"}
              className={
                location.pathname === "/app/aiBlog"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/app/seoAnalyzer"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/seoAnalyzer"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <AnalyzerIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/seoAnalyzer"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"4-Analyzer"}
              className={
                location.pathname === "/app/seoAnalyzer"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/app/seoBlog"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/seoBlog"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <SEOBlogIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/seoBlog"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"5-SEO Blog"}
              className={
                location.pathname === "/app/seoBlog"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/app/plagiarismChecker"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/plagiarismChecker"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <PlagiarismIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/plagiarismChecker"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"6-Plagiarism"}
              className={
                location.pathname === "/app/plagiarismChecker"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/app/imageCrawler"}>
          <ListItem
            onClick={handleDrawerToggle}
            button
            className={
              location.pathname === "/app/imageCrawler"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <ImageCrawlerIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/imageCrawler"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"7-Image Crawler"}
              className={
                location.pathname === "/app/imageCrawler"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
          </ListItem>
        </Link>
        <Link className={classes.link} to={"/app/invoices"}>
          <ListItem
            onClick={handleDrawerToggle}
            className={
              location.pathname === "/app/invoices"
                ? classes.listItemActive
                : classes.listItem
            }
          >
            <HTMLCodeIcon
              style={{ fontSize: 20 }}
              className={
                location.pathname === "/app/invoices"
                  ? classes.navItemIconActive
                  : classes.navItemIcon
              }
            />
            <ListItemText
              primary={"8-HTML Code"}
              className={
                location.pathname === "/app/invoices"
                  ? classes.listItemTextActive
                  : classes.listItemText
              }
            />
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
        <div className={classes.navBar}>
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
              color="inherit"
              className={classes.avatarBtn}
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

export default AppTemplate;
