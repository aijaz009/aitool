const url = 'https://api.aimlapi.com/chat/completions';

// Hardcoded API key
const apiKey = 'f41d3c8b7c0b4c9e942360989cd72a05'; // Replace with your actual API key

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatContainer = document.getElementById('chatContainer');

let messageHistory = []; // Array to store message history

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
    messageHistory.push({ role: 'user', content: message }); // Record user message
    userInput.value = ''; // Clear input field

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistralai/Mistral-7B-Instruct-v0.2', // Model name as per your requirement
            messages: messageHistory, // Send the entire message history
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
    // Log the full response for debugging
    console.log('Full API Response:', data);

    // Check if the response is an object
    if (typeof data === 'object') {
        // Check if the response has a 'choices' property
        if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
            const choice = data.choices[0]; // Get the first choice
            if (choice && choice.message && choice.message.content) {
                appendMessage(choice.message.content.trim(), 'Bot'); // Display the bot's response text
                messageHistory.push({ role: 'assistant', content: choice.message.content.trim() }); // Record bot response
            } else {
                appendMessage('No response text found in choices.', 'Bot');
            }
        } else if (data.error) {
            // Check if the response has an 'error' property
            appendMessage(`Error: ${data.error.message}`, 'Bot');
        } else if (data.result) {
            // Check if the response has a 'result' property
            appendMessage(data.result.response || 'No response available.', 'Bot');
        } else {
            // Handle unexpected response format
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

// Show chat container directly
chatContainer.style.display = 'flex'; // Show chat container
appendMessage('Welcome! You can start chatting now.', 'Bot');
