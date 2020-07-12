import React,{useState,useEffect} from 'react';
import {Line,Bar} from 'react-chartjs-2';

function Chart({singleCountry,singleCountryData}) {
  const [dailyData,setDailyData]=useState([])
  const fetchDailyData=async()=>{
    const res = await fetch("https://covid19.mathdro.id/api/daily");
    const resjson = await res.json()
    const modifiedData = resjson.map(item=>({
      confirmed:item.confirmed.total,
      deaths:item.deaths.total,
      date:item.reportDate
    }))
    return modifiedData
  }
  
  useEffect(()=>{
    
    fetchDailyData().then(res=>setDailyData(res))
    
  },[])

  const Linechart = ()=>{
    return(
      dailyData ?
        (
          <Line
            data={{
              labels: dailyData.map(({date})=>date),
              datasets: [{
                data: dailyData.map(({confirmed})=>confirmed),
                label: "Infected",
                borderColor:"#3333ff"
              }, {
                data: dailyData.map(({deaths})=>deaths),
                label: "Deaths",
                borderColor:"red"
              }]
            }}
          />
        ) : null
      
    )
  }


  const Barchart=()=>{
    return(
      <Bar
      data={{
        labels:['Infected','Recovered','Deaths'],
        datasets:[{
          label:'People',
          backgroundColor:[
          'rgba(0,0,255,0.5)',
          'rgba(0,255,0,0.5)',
          'rgba(255,0,0,0.5)'
          ],
          data:[singleCountryData.Confirmed,singleCountryData.Recovered,singleCountryData.Death]
        }]
      }}
      options={{
        legend:{display:false},
        title:{display:true,text:`current state in country`}
      }}

      />
    )
  }
  console.log("single data",singleCountryData)
  return (
    <div>
      <h5>{Object.keys(singleCountryData).length === 0 && singleCountryData.constructor === Object?
        Linechart():
        Barchart()
      }</h5>

    </div>
  );
}

export default Chart;
