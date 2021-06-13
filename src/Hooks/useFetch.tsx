import React, {useState, useEffect} from 'react';

import {IWeathersByDay} from '../Interfaces/weatherData';

import {getWeatherByDay} from '../Utils/getWeatherByDay';

import WeatherCard from '../Components/WeatherCard';

const useFetch = (): [boolean, boolean, Date, () => JSX.Element] => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<IWeathersByDay | null>(null);

	const updateTimeInit = new Date();
	const [updateTime, setUpdateTime] = useState(updateTimeInit);

	const handleFetch = async () => {
		try {
			const weatherData = await getWeatherByDay();
			setData(weatherData);

			setIsLoaded(true);
			setIsError(false);
		} catch {
			setIsLoaded(false);
			setIsError(true);
		}
	};

	const handleUpdateTime = () => {
		const time = new Date();
		setUpdateTime(time);
	};

	const tick = async () => {
		await handleFetch();
		handleUpdateTime();
	};

	useEffect(() => {
		tick();
		const hourInMilliseconds = 1000 * 60 * 60;
		const timerID = setInterval(() => tick(), hourInMilliseconds);
		return () => {
			clearInterval(timerID);
		};
	}, []);

	const render = () => {
		return (
			<div className="flex flex-row space-x-10 m-10">
				<WeatherCard {...data!.today} />
				<WeatherCard {...data!.tomorrow} />
				<WeatherCard {...data!.afterTomorrow} />
			</div>
		);
	};

	return [isLoaded, isError, updateTime, render];
};

export default useFetch;
