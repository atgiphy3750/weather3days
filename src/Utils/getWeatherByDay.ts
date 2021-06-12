import {requestWeather} from './requestWeather';
import {buildWeather} from './buildWeather';
import {IWeathersByDay} from '../Interfaces/weatherData';

const getWeatherByDay = async () => {
	const weathersRaw = await requestWeather();
	const weatherBuilt: IWeathersByDay = buildWeather(weathersRaw);
	return weatherBuilt;
};

export {getWeatherByDay};
