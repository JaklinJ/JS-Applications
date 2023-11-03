async function attachEvents() {
    const locationRef = document.getElementById('location');
    const btn = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const divCurrent = document.getElementById('current');
    const divUpcoming = document.getElementById('upcoming');
    const currentConditions = document.querySelectorAll('.label')[0];
    const upcomingForecast = document.querySelectorAll('.label')[1];

    const locationsURI = 'http://localhost:3030/jsonstore/forecaster/locations';
    const currentCondURI = 'http://localhost:3030/jsonstore/forecaster/today/';
    const upcomingCondURI = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

    btn.addEventListener('click', getWeather);

    async function getWeather(e) {
        const responce = await fetch(locationsURI)
        const data = await responce.json();
        let isFound = false;

        data.forEach(el => {
            if (el.name == locationRef.value) {
                forecast.style.display = 'visible';
                forecast.style.display = 'block';
                isFound = true;
                if(divCurrent.contains(document.querySelector('.forecasts'))) {
                    document.querySelector('.forecasts').remove();
                    
                }
                if(divUpcoming.contains(document.querySelector('.forecast-info'))) {
                    while(document.querySelector('.forecast-info')) {
                        document.querySelector('.forecast-info').remove();
                    }
                    
                }
                getTodayForecast(el.code);
                getThreeDayForecast(el.code);
            }
            if (!isFound) {
                forecast.style.display = 'visible';
                forecast.style.display = 'block';
                return forecast.textContent = "Error";
            }
        })
    }
    const weaterSymbols = {
        "Sunny": '☀',
        'Partly sunny':  '⛅',
        'Overcast':  '☁',
        'Rain': '☂',
        'Degrees': '°'
    }

    async function getTodayForecast(code) {
       

        const responce = await fetch(currentCondURI + code);
        const data = await responce.json();

        const condition = data.forecast.condition;
       
        
        const forecasts = createDomElement('div', 'forecasts', '');
        divCurrent.appendChild(forecasts);
        const spanSymbol = createDomElement('span', 'symbol', `${weaterSymbols[condition]}`);
        forecasts.appendChild(spanSymbol);
        const conditionSpan = createDomElement('span', 'condition', '');
        forecasts.appendChild(conditionSpan);
        const cityName = createDomElement('span', 'forecast-data', `${data.name}`)
        conditionSpan.appendChild(cityName);
        const degrees = createDomElement('span', 'forecast-data', `${data.forecast.low}${weaterSymbols.Degrees}/${data.forecast.high}${weaterSymbols.Degrees}`)
        conditionSpan.appendChild(degrees);
        const conditions = createDomElement('span', 'forecast-data', condition);
        conditionSpan.appendChild(conditions);
        
    }

    async function getThreeDayForecast(code) {
        const responce = await fetch(upcomingCondURI + code);
        const data = await responce.json();


        const threeDay = Object.entries(data)[0][1];
        for (const obj of threeDay) {

            const info = createDomElement('div', 'forecast-info', '');
            divUpcoming.appendChild(info);
            const upcoming = createDomElement('span', 'upcoming');
            const symbol = createDomElement('span', 'symbol', `${weaterSymbols[obj.condition]}`);
            upcoming.appendChild(symbol);
            const degrees = createDomElement('span', 'forecast-data', `${obj.low}${weaterSymbols.Degrees}/${obj.high}${weaterSymbols.Degrees}`);
            upcoming.appendChild(degrees);
            const forecastData = createDomElement('span','forecast-data', `${obj.condition}`);
            upcoming.appendChild(forecastData); 
            info.appendChild(upcoming);
            
        }
        
    }

    function createDomElement(type, className, text) {
       
           let el = document.createElement(`${type}`);
        
        if (className) {
            el.classList.add(`${className}`);
        }
        if(text) {
            el.textContent = `${text}`;
        }
        return el;
    }

    function clearData(element, className) {
        while (element.lastChild.className != className) {
            element.removeChild(element.lastChild);
        }
    }
}

attachEvents();