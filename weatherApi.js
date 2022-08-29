const API_KEY='6c67ac8bbcd200cc4e2cd96824e9cc1f'
let input=document.querySelector('input')
let displayAll=document.querySelector('#displayAll')
let cityDisplay=document.querySelector('#cityDisplay')
let tempDisplay=document.querySelector('#tempDisplay')
let appearDisplay=document.querySelector('#appearDisplay')
input.addEventListener('keyup',e=>{
    let value=e.target.value
    if(e.key==='Enter'){
        GetWeatherReport(value)
    }
})
async function GetWeatherReport(city){
    let Base_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    let data=await fetch(Base_url)
    let response=await data.json()
    console.log(response);
        let output=''
        output +=
        `
        <h1 id="cityDisplay">Place Name : ${response.name}</h1>
        <h1 id="tempDisplay">Temp : ${Math.round(response.main.temp-273)}&deg;c</h1>
        <img id="iconDisplay" src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="${response.weather[0].description}">
        <h1 id="appearDisplay">${response.weather[0].main} in ${response.name}</h1>
        `
        displayAll.innerHTML=output
}

async function getlocation(){
   window.navigator.geolocation.getCurrentPosition(async ele=>{
            let longitude=ele.coords.longitude
            let latitude=ele.coords.latitude
            console.log(longitude,latitude);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            console.log(url);
            let data = await window.fetch(url);
            let response = await data.json();
            let output=''
            output +=
            `
            <h1 id="cityDisplay">Current location : ${response.name}</h1>
            <h1 id="tempDisplay">Temp : ${Math.round(response.main.temp-273)}&deg;c</h1>
            <img id="iconDisplay" src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="${response.weather[0].description}">
            <h1 id="appearDisplay">${response.weather[0].main} in ${response.name}</h1>
            `
            displayAll.innerHTML=output
        })
    }
window.addEventListener("DOMContentLoaded", getlocation)