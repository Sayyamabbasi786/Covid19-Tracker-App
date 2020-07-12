import React,{useState,useEffect} from 'react';
import {FormControl,NativeSelect} from '@material-ui/core'
const Country=({handleCountryChange,singleCountryDataNULL})=> {
    const [countryData,setCountryData]=useState([])
    

    useEffect(()=>{

        const getCountries = async()=>{
            const res = await fetch("https://covid19.mathdro.id/api/countries")
            const resjson = await res.json()
            return resjson.countries.map((item)=>(item.name))
        }

        getCountries().then(res=>setCountryData(res))
    },[])
  return (
      <div>
          <FormControl>
              <NativeSelect defaultValue="" onChange={(e)=>{
                  e.target.value!==null&&e.target.value!==""?
                handleCountryChange(e.target.value):
                singleCountryDataNULL({})
              }}>
                <option value="">Global</option>
                {
                    countryData.map((item,ind)=>{
                        return(
                            <option value={item} key={ind}>{item}</option>
                        )
                    })
                }
              </NativeSelect>
          </FormControl>
      </div>
  );
}

export default Country;
