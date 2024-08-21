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
    .then((response
