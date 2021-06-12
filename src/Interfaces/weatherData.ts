interface IWeatherDataRaw {
	hour: string;
	day: string;
	temp: string;
	tmx: string;
	tmn: string;
	sky: string;
	pty: string;
	wfKor: string;
	wfEn: string;
	pop: string;
	r12: string;
	s12: string;
	ws: string;
	wd: string;
	wdKor: string;
	wdEn: string;
	reh: string;
	r06: string;
	s06: string;
}

interface IWeatherDataParsed {
	day: number;
	hour: number;
	temp: number;
	weather: string;
	pop: number;
}

interface IWeathersByDay {
	today: IWeatherDataParsed;
	tomorrow: IWeatherDataParsed;
	afterTomorrow: IWeatherDataParsed;
}

interface IIconStyle {
	size?: number;
	className?: number;
}

export type {IWeatherDataRaw, IWeatherDataParsed, IWeathersByDay, IIconStyle};
