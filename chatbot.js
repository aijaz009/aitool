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
            const errorText = await response.text(); // Get the error response as text
            throw new Error(`API Error (${response.status}): ${errorText}`);
        }
        
        const resultText = await response.text(); // Get the response as text
        appendMessage(resultText, 'Bot'); // Display bot's reply
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error: Unable to get response from the bot.', 'Bot');
    }
};

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
