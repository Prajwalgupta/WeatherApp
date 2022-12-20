import React,{useState,useEffect} from 'react';
import sunny from './sunny.jpg'
import winter from './winter.jpg'

export default function Mainfile(props) {
  const [data,setData] = useState({
    main: {
      temp:"",
      humidity:"",
    },
    name:"",
    weather:[""],
    wind: {
      speed:"",
    }
  });
  const [city,setCity] = useState("");
  const [searchCity,setSearchCity] = useState("Patna");
  
  
  
  const apikey = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=154505d05ae8727798cae36fe8359d1a`;
  


  const getData = async() =>{
    try{
      const data = await fetch(apikey);
      props.setProgress(10);
      const Jsondata = await data.json();
      props.setProgress(40);
      console.log(Jsondata);
      setData(Jsondata);
      props.setProgress(100);
    }
    catch(error)
    {
      alert("The error is:" + error);
    }
   
  }

  useEffect(()=>{
    getData();
  },[searchCity])

   const weath = Math.round(data.main.temp-273.15)>20?sunny:winter;
  const styleObj = {
    backgroundImage:`url(${weath})` ,
    width:35+"rem",
    height:25+"rem",
    backgroundSize:"cover",
}
  const handleChange = (e) =>
  {
    setCity(e.target.value);
    console.log(e.target.value);
  }
  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if(city==="" || city===null || city===undefined) city = "Patna";
    setSearchCity(city);
    setCity("");
    document.title = `Weather-App-${capitalizeFirstLetter(
      city
    )}`;
  }

const  capitalizeFirstLetter = (str) =>{
  const str2 = str.charAt(0).toUpperCase()+str.slice(1);
  return str2;
}

  return (
    <>
    <div className="main-container" >
        <div className="head-container" >
          <div className="inp-container">
              <input type="text" placeholder='Enter City name' className='inp' onChange={handleChange} value={city}/>
          </div>
          <div className="btn" onClick={handleSubmit}>Search</div>
        </div>
        <div id='img-container' style={styleObj}>
            <div className="name">{data.name===undefined?"":data.name}</div>
            <div className="temp-haze">
               <div className="temp">Temp:-{Math.round(data.main.temp-273.15)===undefined?"":Math.round(data.main.temp-273.15)}°c</div>
               <div className="haze">
               {data.weather[0].main===undefined?"":data.weather[0].main}
               </div>
            </div>
            <div className="wind-humid">
                  <div className="wind">Wind-speed:{data.wind.speed===undefined?"":data.wind.speed}</div>
                  <div className="humid">Humidity:{data.main.humidity===undefined?"":data.main.humidity}</div>
            </div>
        </div>

    </div>
    
    
        
    </>
  )
}
