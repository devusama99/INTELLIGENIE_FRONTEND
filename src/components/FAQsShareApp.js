import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Button,
  Typography,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import {
  FiClipboard as ClipboardIcon,
  FiFacebook as FacebookIcon,
  FiTwitter as TwitterIcon,
} from "react-icons/fi";
import { FaWhatsapp as WhatsappIcon } from "react-icons/fa";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    margin: theme.spacing(8),
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
  accordion: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: "none",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: theme.shape.borderRadius,
  },
  accordionHeading: {
    color: theme.palette.dark.main,
    fontWeight: "bold",
    fontSize: "18px",
  },
  contentHeading: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  clipboardBtn: {
    borderRadius: "50%",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: "65px",
    width: "65px",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    boxShadow: "none",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  btnIcon: {
    fontSize: "22px",
    padding: 0,
  },
  shareBtns: {
    display: "flex",
  },
  whatsappicon: {
    fontSize: "26px",
    padding: 0,
  },
  displayFlex: {
    display: "flex",
    justifyContent: "center",
  },
}));

function FAQsShareApp() {
  const classes = useStyles();
  const { REACT_APP_BACKEND: BACKEND } = process.env;
  // Accordian
  const [expanded, setExpanded] = useState("");
  const [faqs, setFaqs] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function getFAQS() {
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewALLFAQs`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setFaqs(response.data);
        setExpanded(response.data[0]._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getFAQS();
  }, []);
  return (
    <div className={classes.content}>
      <Typography variant="h2" component={"h2"} className={classes.heading}>
        FAQS AND SHARE APP
      </Typography>
      <Typography variant="h6" className={classes.contentHeading}>
        FAQs about IntelliGenie
      </Typography>
      <div className={classes.FAQsContainer}>
        {faqs.length > 0 ? (
          faqs.map((ele) => {
            return (
              <Accordion
                key={ele._id}
                className={classes.accordion}
                expanded={expanded === ele._id}
                onChange={handleChange(ele._id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  aria-controls="panel1bh-content"
                  id={ele._id}
                >
                  <Typography className={classes.accordionHeading}>
                    {ele.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{ele.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <div className={classes.displayFlex}>
            <CircularProgress size={30} color="primary" />
          </div>
        )}
      </div>
      <Typography variant="h6" className={classes.contentHeading}>
        Share Our App
      </Typography>
      <div className={classes.shareBtns}>
        <div style={{ height: "90px" }}>
          <CopyToClipboard text={"https://intellegenie.netlify.app/"}>
            <Tooltip title={"Copy to Clipboard"} placement="bottom">
              <Button
                variant="contained"
                className={classes.clipboardBtn}
                disableElevation
              >
                <ClipboardIcon className={classes.btnIcon} />
              </Button>
            </Tooltip>
          </CopyToClipboard>
        </div>
        <div style={{ height: "90px" }}>
          <Tooltip title="Share on Facebook" placement="bottom">
            <Button
              variant="contained"
              className={classes.clipboardBtn}
              disableElevation
            >
              <FacebookIcon
                className={classes.btnIcon}
                href="https://www.facebook.com/"
                target="_blank"
              />
            </Button>
          </Tooltip>
        </div>
        <div style={{ height: "90px" }}>
          <Tooltip title="Share on Twitter" placement="bottom">
            <Button
              variant="contained"
              disableElevation
              className={classes.clipboardBtn}
              href={"https://twitter.com/compose/tweet"}
              target={"_blank"}
            >
              <TwitterIcon className={classes.btnIcon} />
            </Button>
          </Tooltip>
        </div>
        <div style={{ height: "90px" }}>
          <Tooltip title="Share on WhatsApp" placement="bottom">
            <Button
              disableElevation
              variant="contained"
              className={classes.clipboardBtn}
              href={"https://wa.me/?text=https://intellegenie.netlify.app/"}
              target={"_blank"}
            >
              <WhatsappIcon className={classes.whatsappicon} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default FAQsShareApp;
