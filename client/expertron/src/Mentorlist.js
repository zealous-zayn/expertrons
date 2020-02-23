import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {fetchAllMentor, deleteMentor} from './action'
import { useSelector,useDispatch } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Mentormodal from './Mentormodal'



export default function Mentorlist(props){
    const data = useSelector(state=>state.all)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()


   useEffect(()=>{
        fetchAllMentor().then(res=>{
          dispatch({ type: "FETCH_ALL_MENTOR", payload: res.data.data})
        }).catch(err=>console.log(err))
      },[props])

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      function delMentor(mentor){
        deleteMentor(mentor.mentor_id).then(res=>{
            fetchAllMentor().then(res=>{
                dispatch({ type: "FETCH_ALL_MENTOR", payload: res.data.data})
              }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
      }
    return(
        <div>
        <List>
            {
                data.map((item,index)=>{
                    return(
                        <div key={index}>
                        <ListItem onClick={()=>{props.setMentor(item.mentor_id)}} style={{justifyContent:"space-between", cursor:"pointer"}}>
                            {item.mentor_name}
                        <DeleteIcon onClick={()=>{delMentor(item)}}/>
                        </ListItem>
                        <Divider />
                        </div>
                    )
                })
            }
        </List>
        <Mentormodal open={open} handleClose={()=>{handleClose()}}/>
        <Fab onClick={()=>{handleOpen()}} style={{float:"right"}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </div>
    )
}