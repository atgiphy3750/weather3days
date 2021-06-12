import React, {useEffect, useState} from 'react';
import {IWeathersByDay} from '../Interfaces/weatherData';
import {getWeatherByDay} from '../Utils/getWeatherByDay';
import WeatherCard from './WeatherCard';
import UpdateTime from './UpdateTime';

interface ILoadState {
	state: 'Loading' | 'Loaded' | 'Error';
}

const WeatherCards = () => {
	const updateTimeInit = new Date();
	const [weathersByDay, setWeathersByDay] = useState<IWeathersByDay>();
	const [updateTime, setUpdateTime] = useState(updateTimeInit);
	const [load, setLoad] = useState<ILoadState>({state: 'Loading'});

	const handleWeathersByDay = async () => {
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

	const handleUpdateTime = () => {
		const time = new Date();
		setUpdateTime(time);
	};

	const tick = async () => {
		await handleWeathersByDay();
		handleUpdateTime();
	};

	useEffect(() => {
		tick();
		const timerID = setInterval(() => tick(), 1000 * 60 * 60);
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
		<div className="flex flex-col">
			<div className="flex flex-row space-x-10 m-10">
				<WeatherCard {...weathersByDay!.today} />
				<WeatherCard {...weathersByDay!.tomorrow} />
				<WeatherCard {...weathersByDay!.afterTomorrow} />
			</div>
			<UpdateTime time={updateTime} />
		</div>
	);
};

export default WeatherCards;
