import {
  AppBar,
  Box,
  Button,
  IconButton,
  Container,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Logo from "./img/Logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    width: "200px",
  },
  appbar: {
    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appbarSM: {
    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  rightContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "60%",
    [theme.breakpoints.down("md")]: {
      minWidth: "70%",
    },
  },
  leftContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: "40%",
    [theme.breakpoints.down("md")]: {
      minWidth: "30%",
    },
  },
  navlink: {
    color: theme.palette.light.main,
  },
  signinBtn: {
    backgroundColor: theme.palette.light.main,
    marginLeft: theme.spacing(3),
    boxShadow: "none",
    color: theme.palette.primary.main,
  },
  menuIcon: {
    color: theme.palette.light.main,
    marginRight: theme.spacing(2),
  },
  toolbarSM: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
  },

  Logo: {
    height: "25px",
    color: theme.palette.light.main,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function Appbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" className={classes.appbar}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box className={classes.rightContainer}>
              <Link to={"/"}>
                <img src={Logo} alt="Logo" className={classes.Logo} />
              </Link>
              <Button
                variant="text"
                className={classes.navlink}
                disableElevation
              >
                Benifits
              </Button>
              <Button
                variant="text"
                className={classes.navlink}
                disableElevation
              >
                Services
              </Button>
              <Button
                variant="text"
                className={classes.navlink}
                disableElevation
              >
                Customers
              </Button>
              <Button
                variant="text"
                className={classes.navlink}
                disableElevation
              >
                Pricing
              </Button>
              <Button
                variant="text"
                className={classes.navlink}
                disableElevation
              >
                FAQs
              </Button>
            </Box>
            <Box className={classes.leftContainer}>
              <Link to="signin" className={classes.link}>
                <Button
                  variant="text"
                  className={classes.navlink}
                  disableElevation
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/" className={classes.link}>
                <Button
                  variant="contained"
                  className={classes.signinBtn}
                  disableElevation
                >
                  Sign Up
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar position="sticky" className={classes.appbarSM}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarSM} disableGutters>
            <Box className={classes.box}>
              <IconButton
                aria-label="delete"
                className={classes.menuIcon}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Link to={"/"}>
                <img src={Logo} alt="Logo" className={classes.Logo} />
              </Link>
            </Box>
            <Box className={classes.box}>
              <Link to="signin" className={classes.link}>
                <Button
                  variant="text"
                  className={classes.navlink}
                  size={"small"}
                  disableElevation
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/" className={classes.link}>
                <Button
                  variant="contained"
                  className={classes.signinBtn}
                  size={"small"}
                  disableElevation
                >
                  Sign Up
                </Button>
              </Link>
            </Box>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Benifits
              </MenuItem>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Services
              </MenuItem>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Customers
              </MenuItem>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Pricing
              </MenuItem>
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                FAQs
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Appbar;
