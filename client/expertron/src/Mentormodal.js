import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {addMentor, fetchAllMentor} from './action'
import { useDispatch } from 'react-redux'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Mentormodal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch()

  const mentorData = {}  
  
  function saveMentor(mentorData){
      addMentor(mentorData).then(res=>{
        fetchAllMentor().then(res=>{
            dispatch({ type: "FETCH_ALL_MENTOR", payload: res.data.data})
            props.handleClose()
          }).catch(err=>console.log(err))
      }).catch(err=>console.log(err))
  }


  

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <FormControl style={{margin:"5px"}}>
        <InputLabel htmlFor="my-input">Full Name</InputLabel>
        <Input onChange={(event=>{mentorData.mentor_name = event.target.value})}  aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl style={{margin:"5px"}}>
        <InputLabel htmlFor="my-input">Field</InputLabel>
        <Input onChange={(event=>{mentorData.mentor_field = event.target.value})}  aria-describedby="my-helper-text" />
        </FormControl>
        <Button onClick={()=>{saveMentor(mentorData)}} style={{float: "right"}} variant="contained" color="primary">
        Save
        </Button>
        </div>
      </Modal>
    </div>
  );
}