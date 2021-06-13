import {IWeatherDataRaw, IWeatherDataParsed} from '../Interfaces/weatherData';

const parseWeather = (weatherRaw: IWeatherDataRaw) => {
	const day = Number(weatherRaw.day);
	const hour = Number(weatherRaw.hour);
	const temp = Number(weatherRaw.tmx);
	const pop = Number(weatherRaw.pop);
	const weather = weatherRaw.wfKor;
	const parsed: IWeatherDataParsed = {
		day,
		hour,
		temp,
		pop,
		weather
	};
	return parsed;
};

const categorizeWeathers = (weathersRaw: IWeatherDataRaw[]) => {
	const today: IWeatherDataParsed[] = [];
	const tomorrow: IWeatherDataParsed[] = [];
	const afterTomorrow: IWeatherDataParsed[] = [];

	const {length} = weathersRaw;
	for (let i = 0; i < length; i++) {
		const weatherData: IWeatherDataParsed = parseWeather(weathersRaw[i]);
		if (weatherData.day === 0) {
			today.push(weatherData);
		} else if (weatherData.day === 1) {
			tomorrow.push(weatherData);
		} else {
			afterTomorrow.push(weatherData);
		}
	}

	return {
		today,
		tomorrow,
		afterTomorrow
	};
};

const shouldUpdateWeather = (weatherOld: string, weatherNew: string) => {
	const weathers = [
		'',
		'맑음',
		'구름많음',
		'구름 많음',
		'흐림',
		'눈',
		'비/눈',
		'비',
		'소나기'
	];

	if (weathers.indexOf(weatherNew) > weathers.indexOf(weatherOld)) {
		return true;
	}

	return false;
};

const mergeWeathers = (weathersParsed: IWeatherDataParsed[]) => {
	const weather: IWeatherDataParsed = {
		day: weathersParsed[0] ? weathersParsed[0].day : 0,
		hour: 0,
		weather: '',
		pop: 0,
		temp: 0
	};

	const {length} = weathersParsed;
	for (let i = 0; i < length; i++) {
		const weatherParsed = weathersParsed[i];
		if (shouldUpdateWeather(weather.weather, weatherParsed.weather)) {
			weather.weather = weatherParsed.weather;
		}

		if (weatherParsed.pop > weather.pop) {
			weather.pop = weatherParsed.pop;
		}

		if (weatherParsed.temp > weather.temp) {
			weather.temp = weatherParsed.temp;
		}
	}

	return weather;
};

const buildWeather = (weathersRaw: IWeatherDataRaw[]) => {
	const {today, tomorrow, afterTomorrow} = categorizeWeathers(weathersRaw);
	const todayMerged = mergeWeathers(today);
	const tomorrowMerged = mergeWeathers(tomorrow);
	const afterTomorrowMerged = mergeWeathers(afterTomorrow);

	return {
		today: todayMerged,
		tomorrow: tomorrowMerged,
		afterTomorrow: afterTomorrowMerged
	};
};

export {buildWeather};
