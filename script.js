const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const apiSettings = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
};

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

function sendMessage(message) {
    const data = JSON.stringify({
        messages: [{ role: 'user', content: message }],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
    });

    fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: apiSettings.method,
        headers: apiSettings.headers,
        body: data,
    })
        .then((response) => {
            console.log('API Response:', response);
            return response.json();
        })
        .then((data) => {
            console.log('API Response Data:', data);
            if (data) {
                console.log('API Response Object Keys:', Object.keys(data));
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        console.log(`API Response ${key}:`, data[key]);
                        if (typeof data[key] === 'object') {
                            console.log(`API Response ${key} Object Keys:`, Object.keys(data[key]));
                        }
                        if (key === 'content') {
                            const botResponse = data[key];
                            addMessageToChatLog(message, bot
