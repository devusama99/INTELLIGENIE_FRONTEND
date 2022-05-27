import { Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

 export default function CustomSnackbar(props){
     
   const[open,setOpen] = useState(props.open)
  useEffect(()=>{
    setOpen(props.open)
  }, [props.open])
      function snackClose(){
        setOpen(!open)
      }
      return(
        <Snackbar
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        open={open}
        autoHideDuration={5000}
        onClose={snackClose}
      >
        <Alert  onClose={snackClose} severity={props.type}>
         { props.message}
        </Alert>
      </Snackbar>
      )
  }