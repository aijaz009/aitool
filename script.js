function sendMessage(message) {
    const data = {
        messages: [
            {
                role: 'user',
                content: message
            }
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
    };

    fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        console.log('API Response:', response);
        return response.json();
    })
    .then((data) => {
        console.log('API Response Data:', data);
        if (data && data.content) {
            const botResponse = data.content;
            addMessageToChatLog(message, botResponse);
        } else {
            console.error('Invalid response format:', data);
            addMessageToChatLog(message, 'Error: Invalid response format');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        addMessageToChatLog(message, 'Error: ' + error.message);
    });
}
