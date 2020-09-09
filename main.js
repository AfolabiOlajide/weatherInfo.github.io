// Service Worker Registeration
// if(navigator.serviceWorker){
//     window.addEventListener('load', _ => {
//         navigator.serviceWorker
//         .register('sw.js')
//         .then(_ => console.log('Service worker: Registered'))
//         .catch( err => console.log(`Service Worker Error: ${err}`))
//     })
// }

// Global Script

// in your api call for temperature set unit=imperial for fahrenheit
// and unit=metric for celsius

// DOM elements needed
let searchBtn = document.getElementById('searchBtn')
let searchInput = document.getElementById('searchInput');
let infoBox = document.getElementById('info');
let err1 = document.getElementById('error');
let log = document.getElementById('log');


const apiKey = 'c2cb06d21e8bc851cdc844acd44fa94b';
// const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput},uk&appid=${apiKey}`;

searchBtn.addEventListener('click', e => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`)
    .then( res => res.json())
    .then( data => {
        console.log(data);
        let weatherInfo = document.createElement('div')
        weatherInfo.classList.add('weather-info')
        weatherInfo.innerHTML = `
                <i class="fas fa-window-close"></i>
                <div class="main-info">
                    <h4 class="location">${data.name} (${data.sys.country})</h4>
                    <img src="icons/${data.weather[0].icon}.png" >
                    <p class="degree">${data.main.temp} &#176;C</p>
                    <p class="description">${data.weather[0].description}</p>
                </div>
        `
        // adding the infomation to the DOM
        // infoBox.appendChild(weatherInfo);
        // new method
        infoBox.insertBefore(weatherInfo, infoBox.childNodes[0]);
        // closeing the box
        document.querySelector('.weather-info').addEventListener('click', e => {
            if(e.target.classList.contains('fa-window-close')){
                e.target.parentElement.remove();
            }
        })
        searchInput.value = '';
    })
    .catch( err => {
        let errorInfo = document.createElement('div')
        errorInfo.classList.add('error')
        errorInfo.innerHTML = `Could not find a match try something similar`
                // err1.style.display = 'block'
                // err1.innerHTML = 'Could not find a match try something similar'
            log.insertBefore(errorInfo, log.childNodes[0]);
                setTimeout( _ => {
                    errorInfo.remove()
                }, 3000)
                
        searchInput.value = '';
        
        throw err;
    })
})

// call function to remove element
// function removeBlock(el){
//     el.parentElement.remove();
// }