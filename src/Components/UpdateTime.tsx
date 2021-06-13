import React from 'react';

const UpdateTime = ({time}: {time: Date}) => {
	const text = `${
		time.getMonth() + 1
	}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;

	return <p className="flex justify-end mr-10 text-lg text-gray-800">{text}</p>;
};

export default UpdateTime;
