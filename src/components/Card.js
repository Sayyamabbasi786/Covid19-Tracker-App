import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
   minWidth:600
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
    const [globalData,setGlobalData]=useState({})


    async function getGlobalData(){

        const res = await fetch("https://api.thevirustracker.com/free-api?global=stats")
        const resjson = await res.json()
        delete resjson.results[0].source
        delete resjson.results[0].total_affected_countries
        delete resjson.results[0].total_active_cases
        delete resjson.results[0].total_new_cases_today
        delete resjson.results[0].total_new_deaths_today
        delete resjson.results[0].total_serious_cases
        delete resjson.results[0].total_unresolved
        setGlobalData(resjson.results[0])
      

    }

    useEffect(()=>{
        getGlobalData()
    },[])
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <Grid container spacing={3}>
      {
        Object.keys(globalData).map((key,ind)=>{
            return(
                <Grid item xs={12} sm={4} key={ind}>
                    <Paper className={classes.paper}>
                    <h5 style={{margin:0}}>{key.replace(/_/g,' ').toUpperCase()}</h5>
                    <h6 style={{margin:0}}>{globalData[key]}</h6>
                    <span style={{fontSize:11}}>
                    Number of {key.replace(/_/g,' ')} of <br/>Covid-19 
                    </span>
                    </Paper>
                </Grid>
            )
        })
    }
        
      </Grid>
    </div>
  );
}
