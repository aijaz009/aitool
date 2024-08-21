const url = 'https://gemini-pro-ai.p.rapidapi.com/';
const RAPIDAPI_KEY = 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO';

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const appendMessage = (message, sender) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
};

const sendMessage = async () => {
    const message = userInput.value.trim();
    if (message === '') return; // Prevent empty messages

    appendMessage(message, 'You');
    userInput.value = ''; // Clear input field

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': 'gemini-pro-ai.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: message }]
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await getResponseData(response);
            throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await getResponseData(response);
        appendBotResponse(data); // Display bot's reply
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error: Unable to get response from the bot.', 'Bot');
    }
};

const getResponseData = async (response) => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        return await response.text();
    }
};

const appendBotResponse = (data) => {
    if (typeof data === 'string') {
        appendMessage(data, 'Bot');
    } else if (Array.isArray(data)) {
        for (const item of data) {
            appendMessage(item, 'Bot');
        }
    } else if (typeof data === 'object') {
        for (const key in data) {
            appendMessage(`${key}: ${data[key]}`, 'Bot');
        }
    }
};

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
