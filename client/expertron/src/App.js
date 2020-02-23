import React, {useState} from 'react';
import './App.css';
import {Grid} from '@material-ui/core';
import Mentorlist from './Mentorlist'
import Singlementor from './Singlementor'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




function App() {

  const [mentorId, setMentorid] = useState()

  function set(id){
    setMentorid(id)
  }

return (
  <Grid container>
    <Grid item xs={12}>
    <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Expertrons
          </Typography>
        </Toolbar>
      </AppBar>
      </Grid>
    <Grid  style={{padding: "5px", height: "92vh", borderRight: "0.2mm grey solid"}} item xs={12} sm={3}>
    <Typography variant="h5">Mentors List</Typography>
    <Mentorlist setMentor={(mentorid)=>{set(mentorid)}} />
    </Grid>
    <Grid style={{padding: "5px"}} item xs={12} sm={9}><Singlementor mentorid={mentorId}/></Grid>
    </Grid>
  );
}

export default App;
