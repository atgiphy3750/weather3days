import React, {useEffect, useState} from 'react';
import {IWeathersByDay} from '../Interfaces/weatherData';
import {getWeatherByDay} from '../Utils/getWeatherByDay';
import WeatherCard from './WeatherCard';

interface ILoadState {
	state: 'Loading' | 'Loaded' | 'Error';
}

const WeatherCards = () => {
	const [weathersByDay, setWeathersByDay] = useState<IWeathersByDay>();
	const [load, setLoad] = useState<ILoadState>({state: 'Loading'});

	const setWeatherProp = async () => {
		try {
			const weathers = await getWeatherByDay();
			setWeathersByDay(weathers);
			if (weathers) {
				setLoad({state: 'Loaded'});
			} else {
				setLoad({state: 'Error'});
			}
		} catch {
			setLoad({state: 'Error'});
		}
	};

	useEffect(() => {
		setWeatherProp();
		const timerID = setInterval(() => setWeatherProp(), 1000 * 60 * 60);
		return () => {
			clearInterval(timerID);
		};
	}, []);

	if (load.state === 'Loading') {
		return <p>Loading</p>;
	}

	if (load.state === 'Error') {
		return <p>Error</p>;
	}

	return (
		<div className="flex flex-row space-x-10 m-10">
			<WeatherCard {...weathersByDay!.today} />
			<WeatherCard {...weathersByDay!.tomorrow} />
			<WeatherCard {...weathersByDay!.afterTomorrow} />
		</div>
	);
};

export default WeatherCards;
