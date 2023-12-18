var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// import { OPEN_WEATHER_MAP_API_KEY } from "./apiKey";
var apiKey = '5d01bbe512930069102b0bcf52c228ca';
function getDate(type, date, timezone) {
    if (type === 'shortDayName') {
        var options = {
            weekday: 'short',
            timeZone: timezone
        };
        return date.toLocaleDateString("en-GB", options);
    }
    else if (type === 'dayName') {
        var options = {
            weekday: 'long',
            timeZone: timezone
        };
        return date.toLocaleDateString("en-GB", options);
    }
    else { // dd MMM, YYYY
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: timezone
        };
        return date.toLocaleDateString("en-GB", options);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // input section
    var countrySelect = document.getElementById('countrySelect');
    var submitButton = document.getElementById('submitButton');
    // weather information section
    var weatherInfoEl = document.querySelector('.weather-info');
    var dayNameEl = document.querySelector('.date-dayname');
    var fulldateEl = document.querySelector('.date-day');
    var locationEl = document.querySelector('.location');
    var weatherIconEl = document.querySelector('.current-weather-icon');
    var weatherTempEl = document.querySelector('.weather-temp');
    var weatherDescEl = document.querySelector('.weather-desc');
    var dewPointEl = document.querySelector('.dew-point .value');
    var humidityEl = document.querySelector('.humidity .value');
    var windEl = document.querySelector('.wind .value');
    fetch('https://restcountries.com/v3.1/all')
        .then(function (response) { return response.json(); })
        .then(function (countries) {
        countries.sort(function (a, b) { return a.name.common.localeCompare(b.name.common); });
        countries.forEach(function (country) {
            var option = document.createElement('option');
            var values = "".concat(country.latlng, ",").concat(country.name.common);
            option.value = values;
            option.text = country.name.common;
            countrySelect.add(option);
        });
    })
        .catch(function (error) { return console.error('Error fetching countries:', error); });
    submitButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var selectedCountry, latitude, longitude, countryName, weatherResponse, weatherData, weatherDisplay, today, timezone, dayName, currentDate, iconId, dailyData, day, nextDay, nextDayEl, nextDayTempEl, nextDayIconEl, dayIconId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectedCountry = countrySelect.value.split(',');
                    latitude = parseFloat(selectedCountry[0]);
                    longitude = parseFloat(selectedCountry[1]);
                    countryName = selectedCountry[2] || '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://api.openweathermap.org/data/3.0/onecall?lat=".concat(latitude, "&lon=").concat(longitude, "&units=metric&appid=").concat(apiKey))];
                case 2:
                    weatherResponse = _a.sent();
                    return [4 /*yield*/, weatherResponse.json()];
                case 3:
                    weatherData = _a.sent();
                    weatherDisplay = weatherInfoEl && window.getComputedStyle(weatherInfoEl);
                    if (weatherDisplay && weatherData && weatherData.current) {
                        if (weatherInfoEl && weatherDisplay.visibility === 'hidden')
                            weatherInfoEl.style.visibility = 'visible';
                        today = new Date();
                        timezone = weatherData.timezone;
                        dayName = getDate('dayName', today, timezone);
                        currentDate = getDate('fulldate', today, timezone);
                        dayNameEl.textContent = dayName;
                        fulldateEl.textContent = currentDate;
                        locationEl.textContent = countryName;
                        weatherTempEl.textContent = "".concat(weatherData.current.temp, "\u00B0C");
                        weatherDescEl.textContent = weatherData.current.weather[0].description;
                        dewPointEl.textContent = "".concat(weatherData.current.dew_point, "\u00B0C");
                        humidityEl.textContent = "".concat(weatherData.current.humidity, " %");
                        windEl.textContent = "".concat(weatherData.current.wind_speed, " km/h");
                        iconId = weatherData.current.weather[0].icon;
                        weatherIconEl.src = "https://openweathermap.org/img/wn/".concat(iconId, "@2x.png");
                        dailyData = weatherData.daily;
                        for (day = 1; day <= 4; day++) {
                            nextDay = new Date(today);
                            nextDay.setDate(today.getDate() + day);
                            nextDayEl = document.querySelector("#day".concat(day + 1, " .day-name"));
                            nextDayTempEl = document.querySelector("#day".concat(day + 1, " .day-temp"));
                            nextDayIconEl = document.querySelector("#day".concat(day + 1, " .weather-icon"));
                            nextDayEl.textContent = getDate('shortDayName', nextDay, timezone);
                            nextDayTempEl.textContent = "".concat(dailyData[day - 1].temp.day, "\u00B0C");
                            dayIconId = dailyData[day - 1].weather[0].icon;
                            nextDayIconEl.src = "https://openweathermap.org/img/wn/".concat(dayIconId, ".png");
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching weather information:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
