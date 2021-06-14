import React from 'react';
import {IWeatherDataParsed} from '../Interfaces/weatherData';
import {
	IoMdRainy,
	IoMdSunny,
	IoMdCloudy,
	IoMdSnow,
	IoMdWarning
} from 'react-icons/io';

const WeatherCard = (weatherData: IWeatherDataParsed) => {
	const colors = {
		sunny: '#FBBF24',
		cloudy: '#9CA3AF',
		snowy: '#BFDBFE',
		rainy: '#60A5FA'
	};
	const weather = {
		Icon: IoMdSunny,
		color: ''
	};
	switch (weatherData.weather) {
		case '맑음':
			weather.Icon = IoMdSunny;
			weather.color = colors.sunny;
			break;
		case '흐림':
		case '구름많음':
		case '구름 많음':
			weather.Icon = IoMdCloudy;
			weather.color = colors.cloudy;
			break;
		case '눈':
			weather.Icon = IoMdSnow;
			weather.color = colors.snowy;
			break;
		case '비':
		case '비/눈':
		case '소나기':
			weather.Icon = IoMdRainy;
			weather.color = colors.rainy;
			break;
		default:
			weather.Icon = IoMdWarning;
			weather.color = 'salmon';
			console.log(`No weather data. Today is ending.. ${weatherData.weather}`);
	}

	const dayWords = ['오늘', '내일', '모레'];
	const iconStyle = {
		size: 180,
		className: 'inline',
		color: weather.color
	};

	const tempAndPop = () => {
		if (weatherData.weather) {
			return (
				<>
					<div>
						<span>{weatherData.temp}°C</span>
					</div>
					<div>
						<span>{weatherData.pop}%</span>
					</div>
				</>
			);
		}

		return (
			<>
				<div>NO DATA</div>
			</>
		);
	};

	return (
		<div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl py-14 shadow-xl">
			<div className="text-4xl items-center justify-center flex">
				<p>{dayWords[Number(weatherData.day)]}</p>
			</div>
			<div className="py-12 px-12">
				<weather.Icon {...iconStyle} />
			</div>
			<div
				className={`flex flex-row items-center ${
					weatherData.weather ? 'justify-between' : 'justify-center'
				} text-3xl px-10`}
			>
				{tempAndPop()}
			</div>
		</div>
	);
};

export default WeatherCard;
