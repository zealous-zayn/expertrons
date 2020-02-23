import React , {useEffect, useState} from 'react';
import {Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {singleMentor, addTask} from './action';
import { useSelector,useDispatch } from 'react-redux'
import {Grid} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default function Singlementor(props){

    const data = useSelector(state=>state.single);
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState('')
    const [taskLevel, setTaskLevel] = useState('')
    const id = props.mentorid
    const task = useSelector(state => state.task)
    
    useEffect(()=>{
        singleMentor(id).then(res=>{
            dispatch({type: "FETCH_SINGLE_MENTOR", payload: res.data})
            return res
        }).then(res=>{
            if(res.data !==null){
            dispatch({type:"FETCH_MENTOR_TASK", payload: res.data.assigned_task})
            }
        })
    },[props])


    function addtask(){
        let taskDetails = {
            mentor_id : id,
            task_name : taskName,
            task_level : taskLevel
        }
        addTask(taskDetails).then(res=>{
            task.push(taskDetails)
            dispatch({type:"FETCH_MENTOR_TASK", payload: task})
            setTaskName('')
            setTaskLevel('')
        })
    }

    if(data !== null){
    return(
        <Container fixed>
        <Typography variant="h5">Mentor Details</Typography>
        <div style={{margin:"15px"}}>
        <Typography style={{fontSize:"bold"}}>Mentor Name : {data.mentor_name}</Typography>
        <Typography style={{fontSize:"bold"}}>Mentor Field : {data.mentor_field}</Typography>
        </div>
        <div style={{border:"2px grey solid", padding:"8px", width:"50vw"}}>
        <Typography variant="h5">Task Details</Typography>
        <Divider/>
        {
            task.map((t,i)=>{
            return(
                <Grid container key={i}>
                <Grid item xs={6}><Typography style={{fontSize:"bold"}}>Task Name : {t.task_name}</Typography></Grid>
                <Grid item xs={6}><Typography style={{fontSize:"bold"}}>Task Level : {t.task_level}</Typography></Grid>
                </Grid>
            )
        })}
        <FormControl style={{margin:"5px"}}>
        <InputLabel htmlFor="my-input">Task Name</InputLabel>
        <Input value={taskName} onChange={(event=>{setTaskName(event.target.value)})}  aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl style={{margin:"5px"}}>
        <InputLabel htmlFor="my-input">Task Level</InputLabel>
        <Input value={taskLevel} onChange={(event=>{setTaskLevel(event.target.value)})}  aria-describedby="my-helper-text" />
        </FormControl>
        <Button onClick={()=>{addtask()}} style={{float: "right", margin:"5px"}} variant="contained" color="primary">
        Add
        </Button>
        </div>
        </Container>
    )
    } else {
        return(
            <Container fixed>
            <Typography variant="h5">Select Mentor from list to see details and add task</Typography>
            </Container> 
        )
    }
}