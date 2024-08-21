const bodyInput = document.getElementById('body-input');
const sendButton = document.getElementById('send-button');
const responseOutput = document.getElementById('response-output');

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const body = bodyInput.value.trim();
    if (body) {
        sendRequest(body);
        bodyInput.value = '';
    }
});

function sendRequest(body) {
    const data = {
      {
"messages": [
{
"role": "user",
"content": "Hello, how are you?"
}
],
"system_prompt": "",
"temperature": 0.9,
"top_k": 5,
"top_p": 0.9,
"max_tokens": 256,
"web_access": false
}

    const headers = {
        'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
    };

    fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('API Response:', data);
        if (data && data.messages && data.messages[0] && data.messages[0].content) {
            const botResponse = data.messages[0].content;
            responseOutput.textContent = `Bot Response: ${botResponse}`;
        } else {
            console.error('Invalid response format:', data);
            responseOutput.textContent = 'Error: Invalid response format';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        responseOutput.textContent = 'Error: ' + error.message;
    });
}
