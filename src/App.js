import React from 'react';
import './App.css';
import Card from './components/Card.js'
import Chart from './components/Chart'
import Country from './components/Countrypicker'

function App() {
  const [singleCountry,setSingleCountry]=React.useState('')
  const [singleCountryData,setSingleCountryData]=React.useState({})
  console.log("single country data app.js",singleCountryData)
  const getSingleCountry=(country)=>{
    setSingleCountry(country)
    fetchCountryData(country)
  }

  const singleCountryDataNULL=(counObj)=>{
    setSingleCountryData(counObj)
  }

  const fetchCountryData = async(country)=>{
    const res = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
    res.json().then(res=>setSingleCountryData({
      Confirmed:res.confirmed.value,
      Death:res.deaths.value,
      Recovered:res.recovered.value
    }))
  }


  return (
    <div>
      <h2 style={{fontSize:50,margin:0,padding:10}}>COVID-19</h2>
      <Card />
      <Country handleCountryChange={getSingleCountry} singleCountryDataNULL={singleCountryDataNULL}/>
      <Chart singleCountry={singleCountry} singleCountryData={singleCountryData}/>
      
    </div>
  );
}

export default App;
