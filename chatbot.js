const url = 'https://api.aimlapi.com/chat/completions';
const apiKey = 'f41d3c8b7c0b4c9e942360989cd72a05'; // Your API key

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
    if (message === '') {
        appendMessage('Please enter a message.', 'Bot');
        return; // Prevent empty messages
    }

    appendMessage(message, 'You');
    userInput.value = ''; // Clear input field

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ],
            max_tokens: 512,
            stream: false
        })
    };

    try {
        const response = await fetch(url, options);
        
        // Check for HTTP errors
        if (!response.ok) {
            const errorText = await response.text(); // Get error response as text
            throw new Error(`HTTP Error (${response.status}): ${errorText}`);
        }

        // Handle response based on content type
        const contentType = response.headers.get('Content-Type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Process and display the response
        displayResponse(data);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error: Unable to get response from the bot. ' + error.message, 'Bot');
    }
};

const displayResponse = (data) => {
    // Check if the response is an object
    if (typeof data === 'object') {
        // Check if the response has a 'choices' property
        if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
            const choice = data.choices[0]; // Get the first choice
            if (choice && choice.text) {
                appendMessage(choice.text, 'Bot'); // Display the bot's response text
            } else {
                appendMessage('No response text found in choices.', 'Bot');
            }
        } else if (data.error) {
            // Check if the response has an 'error' property
            appendMessage(`Error: ${data.error.message}`, 'Bot');
        } else {
            // Log the entire response for debugging
            console.log('Full API Response:', data);
            appendMessage('Unexpected response format. Check console for details.', 'Bot');
        }
    } else if (typeof data === 'string') {
        appendMessage(data, 'Bot');
    } else {
        appendMessage('Unexpected response format.', 'Bot');
    }
};

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
