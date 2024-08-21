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
    body: JSON.stringify({
        messages: [{ role: 'user', content: '' }],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
    }),
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
    apiSettings.body = JSON.stringify({
        messages: [{ role: 'user', content: message }],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
    });

    fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', apiSettings)
        .then((response) => response.json())
        .then((data) => {
            const botResponse = data.messages[0].content;
            addMessageToChatLog(message, botResponse);
        })
        .catch((error) => console.error(error));
}

function addMessageToChatLog(userMessage, botResponse) {
    const userLi = document.createElement('li');
    userLi.classList.add('user');
    userLi.textContent = userMessage;
    chatLog.appendChild(userLi);

    const
