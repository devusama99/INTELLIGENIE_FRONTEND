import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.grey.main}`,
    padding: theme.spacing(1.7),
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
  },
}));

function PageHead(props) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography variant="h5" color="primary" className={classes.heading}>
        {props.title}
      </Typography>
    </Box>
  );
}

export default PageHead;
