import { CircularProgress } from "@material-ui/core"


 export default function Progress(props){
     
      return(
        <CircularProgress color={props.color} size={props.size} style={{marginLeft:'10px'}} />
      )
  }