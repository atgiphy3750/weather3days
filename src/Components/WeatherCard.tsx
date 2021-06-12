import React from 'react';
import {IWeatherDataParsed} from '../Interfaces/weatherData';
import {IoMdRainy, IoMdSunny, IoMdCloudy, IoMdSnow} from 'react-icons/io';

const WeatherCard = (weatherData: IWeatherDataParsed) => {
	const weather = {
		Icon: IoMdSunny,
		color: '',
		colorWeight: '500'
	};
	switch (weatherData.weather) {
		case '맑음':
		case '':
			weather.Icon = IoMdSunny;
			weather.color = 'yellow';
			weather.colorWeight = '400';
			break;
		case '흐림':
		case '구름많음':
			weather.Icon = IoMdCloudy;
			weather.color = 'gray';
			weather.colorWeight = '400';
			break;
		case '눈':
			weather.Icon = IoMdSnow;
			weather.color = 'blue';
			weather.colorWeight = '200';
			break;
		case '비':
		case '비/눈':
		case '소나기':
			weather.Icon = IoMdRainy;
			weather.color = 'blue';
			weather.colorWeight = '400';
			break;
		default:
			console.log(weatherData.weather);
			console.log('WeatherIcon Error');
	}

	const dayWords = ['오늘', '내일', '모레'];
	const iconStyle = {
		size: 180,
		className: `inline text-${weather.color}-${weather.colorWeight}`
	};

	return (
		<div className="bg-gradient-to-br from-white to-blue-50 bg-blue-50 rounded-3xl py-14 shadow-xl">
			<div className="text-4xl items-center justify-center flex">
				<p>{dayWords[Number(weatherData.day)]}</p>
			</div>
			<div className="py-12 px-12">
				<weather.Icon {...iconStyle} />
			</div>
			<div className="flex flex-row items-center justify-between text-3xl px-10">
				<div>
					<span>{weatherData.temp}°C</span>
				</div>
				<div>
					<span>{weatherData.pop}%</span>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
