import PaymentSubscriptionTemplate from "./PaymentSubscriptionTemplate";
import { Typography, Button, Menu, MenuItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import BoxContainerWhite from "./BoxContainerWhite";
import PDFimage from "./img/PDFicon.png";
import {
  FiMoreHorizontal as MenuIcon,
  FiFilePlus as FileIcon,
} from "react-icons/fi";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  content: {
    width: "98.5%",
    boxSizing: "border-box",
    margin: theme.spacing(7),

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4),
    },
  },
  invoicesContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  invoice: {
    minHeight: "250px",
    minWidth: "250px",
    flexGrow: 1,
    border: `1px solid #A2F0F0`,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none",
  },
  pdfImage: {
    height: "70%",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(2),
  },
  invoiceMonth: {
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  dFLex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  MenuIcon: {
    fontSize: "16px",
    color: theme.palette.primary.main,
  },
  ml2: {
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

function Invoices() {
  const classes = useStyles();

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
        <div className={classes.invoicesContainer}>
          <Paper className={classes.invoice}>
            <div className={classes.pdfImage}>
              <img src={PDFimage} alt={"PDF Invoice"} />
            </div>
            <div className={classes.dFLex}>
              <div className={[classes.dFLex, classes.ml2].join(" ")}>
                <FileIcon className={classes.MenuIcon} />
                <Typography variant={"body2"} className={classes.invoiceMonth}>
                  September Invoice
                </Typography>
              </div>
              <Button size={"small"} onClick={handleClick}>
                <MenuIcon className={classes.MenuIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Typography
              variant={"body2"}
              color={"primary"}
              className={classes.ml2}
            >
              Created on 1/September/2021
            </Typography>
          </Paper>
          <Paper className={classes.invoice}>
            <div className={classes.pdfImage}>
              <img src={PDFimage} alt={"PDF Invoice"} />
            </div>
            <div className={classes.dFLex}>
              <div className={[classes.dFLex, classes.ml2].join(" ")}>
                <FileIcon className={classes.MenuIcon} />
                <Typography variant={"body2"} className={classes.invoiceMonth}>
                  September Invoice
                </Typography>
              </div>
              <Button size={"small"} onClick={handleClick}>
                <MenuIcon className={classes.MenuIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Typography
              variant={"body2"}
              color={"primary"}
              className={classes.ml2}
            >
              Created on 1/September/2021
            </Typography>
          </Paper>
          <Paper className={classes.invoice}>
            <div className={classes.pdfImage}>
              <img src={PDFimage} alt={"PDF Invoice"} />
            </div>
            <div className={classes.dFLex}>
              <div className={[classes.dFLex, classes.ml2].join(" ")}>
                <FileIcon className={classes.MenuIcon} />
                <Typography variant={"body2"} className={classes.invoiceMonth}>
                  September Invoice
                </Typography>
              </div>
              <Button size={"small"} onClick={handleClick}>
                <MenuIcon className={classes.MenuIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Typography
              variant={"body2"}
              color={"primary"}
              className={classes.ml2}
            >
              Created on 1/September/2021
            </Typography>
          </Paper>
          <Paper className={classes.invoice}>
            <div className={classes.pdfImage}>
              <img src={PDFimage} alt={"PDF Invoice"} />
            </div>
            <div className={classes.dFLex}>
              <div className={[classes.dFLex, classes.ml2].join(" ")}>
                <FileIcon className={classes.MenuIcon} />
                <Typography variant={"body2"} className={classes.invoiceMonth}>
                  September Invoice
                </Typography>
              </div>
              <Button size={"small"} onClick={handleClick}>
                <MenuIcon className={classes.MenuIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Typography
              variant={"body2"}
              color={"primary"}
              className={classes.ml2}
            >
              Created on 1/September/2021
            </Typography>
          </Paper>
          <Paper className={classes.invoice}>
            <div className={classes.pdfImage}>
              <img src={PDFimage} alt={"PDF Invoice"} />
            </div>
            <div className={classes.dFLex}>
              <div className={[classes.dFLex, classes.ml2].join(" ")}>
                <FileIcon className={classes.MenuIcon} />
                <Typography variant={"body2"} className={classes.invoiceMonth}>
                  September Invoice
                </Typography>
              </div>
              <Button size={"small"} onClick={handleClick}>
                <MenuIcon className={classes.MenuIcon} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Typography
              variant={"body2"}
              color={"primary"}
              className={classes.ml2}
            >
              Created on 1/September/2021
            </Typography>
          </Paper>
        </div>
      </BoxContainerWhite>
    </div>
  );
}

export default Invoices;
