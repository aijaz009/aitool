const bodyInput = document.getElementById('body-input');
const sendButton = document.getElementById('send-button');
const chatLog = document.getElementById('chat-log');

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
        "messages": [
            {
                "role": "user",
                "content": body
            }
        ],
        "system_prompt": "",
        "temperature": 0.9,
        "top_k": 5,
        "top_p": 0.9,
        "max_tokens": 256,
        "web_access": false
    };

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
        if (data && data.content) {
            const botResponse = data.content;
            addMessageToChatLog(body, botResponse);
        } else {
            console.error('Invalid response format:', data);
            addMessageToChatLog(body, 'Error: Invalid response format');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        addMessageToChatLog(body, 'Error: ' + error.message);
    });
}

function addMessageToChatLog(userMessage, botResponse) {
    const userLi = document.createElement('li');
    userLi.classList.add('user');
    userLi.textContent = `You: ${userMessage}`;
    chatLog.appendChild(userLi);

    const botLi = document.createElement('li');
    botLi.classList.add('bot');
    botLi.textContent = `Bot: ${botResponse}`;
    chatLog.appendChild(botLi);

    chatLog.scrollTop = chatLog.scrollHeight;
}
