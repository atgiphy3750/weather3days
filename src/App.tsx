import React from 'react';
import UpdateTime from './Components/UpdateTime';
import useFetch from './Hooks/useFetch';

const App = () => {
	const [isLoaded, isError, updateTime, WeatherCards] = useFetch();

	if (isError) {
		return <p>Error!</p>;
	}

	if (!isLoaded) {
		return <p>Loading</p>;
	}

	return (
		<div className="App h-screen justify-center items-center flex flex-col">
			<WeatherCards />
			<UpdateTime time={updateTime} />
		</div>
	);
};

export default App;
