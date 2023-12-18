const apiKey: string = '';

function getDate(type: string , date: Date, timezone: string) {
  if (type === 'shortDayName') {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      timeZone: timezone
    };
    return date.toLocaleDateString("en-GB", options);
  } else if (type === 'dayName') {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      timeZone: timezone
    };
    return date.toLocaleDateString("en-GB", options);
  } else { // dd MMM, YYYY
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: timezone
    };

    return date.toLocaleDateString("en-GB", options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // input section
    const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

    // weather information section
    const weatherInfoEl: HTMLElement | null = document.querySelector('.weather-info'); 
    const dayNameEl = document.querySelector('.date-dayname') as HTMLHeadingElement;
    const fulldateEl = document.querySelector('.date-day') as HTMLSpanElement;
    const locationEl = document.querySelector('.location') as HTMLSpanElement;
    const weatherIconEl = document.querySelector('.current-weather-icon') as HTMLImageElement;
    const weatherTempEl = document.querySelector('.weather-temp') as HTMLHeadingElement;
    const weatherDescEl = document.querySelector('.weather-desc') as HTMLHeadingElement;
    const dewPointEl = document.querySelector('.dew-point .value') as HTMLSpanElement;
    const humidityEl = document.querySelector('.humidity .value') as HTMLSpanElement;
    const windEl = document.querySelector('.wind .value') as HTMLSpanElement;

    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        countries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        countries.forEach((country: any) => {
          const option: HTMLOptionElement = document.createElement('option');
          const values: string = `${country.latlng},${country.name.common}`
          option.value = values;
          option.text = country.name.common;
          countrySelect.add(option);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));
    
    submitButton.addEventListener('click', async () => {
      const selectedCountry: string[] = countrySelect.value.split(',');
      const latitude: number = parseFloat(selectedCountry[0]);
      const longitude: number = parseFloat(selectedCountry[1]);
      const countryName: string = selectedCountry[2] || '';
      
      try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        const weatherData = await weatherResponse.json();
        
        const weatherDisplay: any | null = weatherInfoEl && window.getComputedStyle(weatherInfoEl);
        if (weatherDisplay && weatherData && weatherData.current) {

          if (weatherInfoEl && weatherDisplay.visibility === 'hidden') weatherInfoEl.style.visibility = 'visible';

          const today = new Date();
          const timezone = weatherData.timezone;
          const dayName = getDate('dayName', today, timezone);
          const currentDate = getDate('fulldate', today, timezone);

          dayNameEl.textContent = dayName;
          fulldateEl.textContent = currentDate;
          locationEl.textContent = countryName;
          weatherTempEl.textContent = `${weatherData.current.temp}°C`;
          weatherDescEl.textContent = weatherData.current.weather[0].description;
          dewPointEl.textContent =`${weatherData.current.dew_point}°C`;
          humidityEl.textContent = `${weatherData.current.humidity} %`;
          windEl.textContent = `${weatherData.current.wind_speed} km/h`;
          const iconId = weatherData.current.weather[0].icon;
          weatherIconEl.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

          // update values of the next 4 days
          const dailyData = weatherData.daily;
          for (let day = 1; day <= 4; day++) {
            const nextDay: Date = new Date(today);
            nextDay.setDate(today.getDate() + day);
            
            const nextDayEl = document.querySelector(`#day${day+1} .day-name`) as HTMLSpanElement;
            const nextDayTempEl = document.querySelector(`#day${day+1} .day-temp`) as HTMLSpanElement;
            const nextDayIconEl = document.querySelector(`#day${day+1} .weather-icon`) as HTMLImageElement;
            
            nextDayEl.textContent = getDate('shortDayName', nextDay, timezone);
            nextDayTempEl.textContent = `${dailyData[day-1].temp.day}°C`;
            const dayIconId = dailyData[day-1].weather[0].icon;
            nextDayIconEl.src = `https://openweathermap.org/img/wn/${dayIconId}.png`;
          }

        }
      } catch (error) {
        console.error('Error fetching weather information:', error);
      }
    });
  });