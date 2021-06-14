import React from 'react';
import UpdateTime from './Components/UpdateTime';
import useFetch from './Hooks/useFetch';

const App = () => {
	const [isLoading, isError, updateTime, WeatherCards] = useFetch();

	const render = () => {
		if (isError) {
			return <p>Error!</p>;
		}

		if (isLoading) {
			return <p>Loading...</p>;
		}

		return (
			<>
				<WeatherCards />
				<UpdateTime time={updateTime} />
			</>
		);
	};

	return (
		<div className="App h-screen justify-center items-center flex flex-col">
			{render()}
		</div>
	);
};

export default App;
