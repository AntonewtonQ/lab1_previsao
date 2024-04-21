getAtualWeather()
const apiKey ='49cc8c821cd2aff9af04c9f98c36eb74';



function getAtualWeather(){
  navigator.geolocation.getCurrentPosition((success) => {
    let {latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
            updateBackground(data.weather[0].main);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayForecast(data);
                
                
            })
        })
        .catch(error => {
            console.error('Error', error);
        });
  });
    
}

function getWeather(){
    const city = document.getElementById('city').value; 
    const forecastDiv =document.getElementById('forecast-div');

    
    if(!city){
        alert('preencha com o nome de uma cidade');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
            updateBackground(data.weather[0].main);
            return fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayForecast(data);
                
                
            })
        })
        .catch(error => {
            console.error('Error', error);
            alert("Digite um nome válido");
        });

}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const cityName = document.getElementById('city-name');
    const countryName = document.getElementById('country-name');
    const temp = document.getElementById('current-temp');
    const humidity = document.getElementById('current-humidity');
    const wind = document.getElementById('current-wind');
    const today = document.getElementById('current-day');
    const pressure = document.getElementById('current-pressure');
    const description = document.getElementById('current-description');

    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const mesesDoAno = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    var now = new Date();
    

    if(data.cod==='404'){

    }else{
        
        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


        cityName.innerHTML= "<i class='bi bi-geo-alt'></i> " +data.name+" ";
        countryName.innerHTML=`<img src='https://flagsapi.com/${data.sys.country}/flat/64.png'>`;
        temp.innerHTML="<i class='bi bi-thermometer-half'></i> " + data.main.temp + " °C"
        
        description.innerHTML="<i class='bi bi-body-text'></i> "+data.weather[0].description;

        today.innerHTML= "<i class='bi bi-calendar-event'></i> Hoje: " + diasSemana[now.getDay()]+" "+now.getDate()+", "+mesesDoAno[now.getMonth()];
        
        
        humidity.innerHTML= "<i class='bi bi-droplet-half'></i> Humidade: " + data.main.humidity + "%";
        
        wind_speed=data.wind.speed *1.60934 ;
        wind.innerHTML="<i class='bi bi-wind'></i> Velocidade do vento: " + wind_speed.toFixed(3) + " km/h";
        pressure.innerHTML="<i class='bi bi-water'></i> Pessão: "+data.main.pressure + " hPa";

       weatherIcon.src = iconUrl;
        
    }
}


function displayForecast(forecast) {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var nowMoment = moment();
    var now = new Date();

    // Loop para exibir o clima futuro
    for (var i = 6; i < forecast.list.length; i += 8) {
        
        

                // Criando um novo objeto de data para o dia do forecast
        var forecastDate = new Date(forecast.list[i].dt * 1000);
        
        // Obtendo o dia da semana correspondente
        var diaSemana = diasSemana[forecastDate.getDay()];

        // Criação de elementos HTML para exibir as informações
        var forecastDay = document.createElement("h5");
        forecastDay.textContent = diaSemana; // Dia da semana

        // Posição do forecast
        var forecastPosition = (i + 2) / 8;


    
        document.getElementById("forecast-date" + forecastPosition).innerHTML = "";
        document.getElementById("forecast-date" + forecastPosition).appendChild(forecastDay);


                var forecastIcon = document.createElement("img");
                forecastIcon.setAttribute(
                  "src",
                  "https://openweathermap.org/img/w/" +
                    forecast.list[i].weather[0].icon +
                    ".png"
                );

                document.getElementById("forecast-icon" + forecastPosition).innerHTML = "";
                document.getElementById("forecast-icon" + forecastPosition).appendChild(forecastIcon);

                document.getElementById("forecast-temp" + forecastPosition).textContent =
                  "Temperatura: " + forecast.list[i].main.temp + " °C";
                document.getElementById("forecast-humidity" + forecastPosition).textContent =
                  "Humidade: " + forecast.list[i].main.humidity + "%";

                  

        
      }   
}

function updateBackground(weatherCondition) {
    var backgroundUrl = '';

    switch(weatherCondition) {
        case 'Clear':
            backgroundUrl = 'https://st5.depositphotos.com/35914836/66086/i/600/depositphotos_660869486-stock-photo-white-clouds-sky.jpg';
           console.log(weatherCondition);
            break;
        case 'Clouds':
            backgroundUrl = 'https://st5.depositphotos.com/18848344/67102/i/450/depositphotos_671027520-stock-photo-cloudy-pre-stormy-sky-background.jpg';
            console.log(weatherCondition);
            break;
            case 'Rain':
                backgroundUrl = 'https://st2.depositphotos.com/1655708/12413/i/600/depositphotos_124134304-stock-illustration-dark-clouds-with-falling-rain.jpg';
                console.log(weatherCondition);
                break;
                
                case 'Snow':
                    backgroundUrl = 'https://st3.depositphotos.com/16196966/18470/i/600/depositphotos_184702354-stock-photo-snowy-forest.jpg';
                    console.log(weatherCondition);
                    break;
                
                    
                       
        default:
            console.log(weatherCondition);   
    }

    document.body.style.backgroundImage = `url(${backgroundUrl})`;
    document.body.style.backgroundSize="cover";
}

/*

function shareWeather(){
    
console.log(navigator.share);
  // Check for Web Share api support
  if (navigator.share) {
    // Browser supports native share api
    navigator.share({
      text: 'Please read this great article: ',
      url: 'https://www.google.com/'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch((err) => console.error(err));
  } else {
    // Fallback
    alert("The current browser does not support the share function. Please, manually share the link")
  }
}
*/