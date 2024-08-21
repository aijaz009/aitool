const url = 'https://gemini-pro-ai.p.rapidapi.com/';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
		'x-rapidapi-host': 'gemini-pro-ai.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ // Convert the body to a JSON string
		contents: [
			{
				role: 'user',
				parts: [{ text: 'Hello' }]
			}
		]
	})
};

try {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Network response was not ok ' + response.statusText);
	}
	const result = await response.json(); // Parse the response as JSON
	console.log(result);
} catch (error) {
	console.error('Error:', error);
}
