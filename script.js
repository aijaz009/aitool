const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

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
        if (response.ok) {
            return response.json();
        } else {
            console.error('API Error:', response.status, response.statusText);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
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

function addMessageToChatLog(userMessage, botResponse) {
    const userLi = document.createElement('li');
    userLi.classList.add('user');
    userLi.textContent = userMessage;
    chatLog.appendChild(userLi);

    const botLi = document.createElement('li');
    botLi.classList.add('bot');
    botLi.textContent = botResponse;
    chatLog.appendChild(botLi);

    chatLog.scrollTop = chatLog.scrollHeight;
}
