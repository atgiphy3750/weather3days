import parser from 'fast-xml-parser';
import axios from 'axios';

const requestWeather = async () => {
	const url =
		'https://cors.bridged.cc/http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4721062000';

	const response = await axios.get(url);
	const xml = response.data;
	const json = parser.parse(xml);
	const cityData = json.rss.channel.item.description.body.data;

	return cityData;
};

export {requestWeather};
