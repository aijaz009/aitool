const url = 'https://api.aimlapi.com/chat/completions';

// Hardcoded API key
const apiKey = 'f41d3c8b7c0b4c9e942360989cd72a05'; // Replace with your actual API key

const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let messageHistory = []; // Array to store message history

const appendMessage = (message, sender, type) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type); // Add type class for styling
    messageElement.innerHTML = `
        <div class="avatar">
            <img src="${type === 'bot' ? 'https://via.placeholder.com/50/4CAF50/ffffff?text=Bot' : 'https://via.placeholder.com/50/007bff/ffffff?text=You'}" alt="${sender} Avatar">
        </div>
        <div class="content">${message}</div>
    `;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
};

const sendMessage = async () => {
    const message = userInput.value.trim();
    if (message === '') {
        appendMessage('Please enter a message.', 'You', 'user');
        return; // Prevent empty messages
    }

    appendMessage(message, 'You', 'user');
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

    let retryCount = 0; // Initialize retry count
    const maxRetries = 3; // Set maximum number of retries

    while (retryCount < maxRetries) {
        try {
            const response = await fetch(url, options);
            
            // Check for HTTP errors
            if (!response.ok) {
                const errorText = await response.text(); // Get error response as text
                if (response.status === 429) {
                    // If rate limit exceeded, wait and retry
                    const waitTime = 2000 * Math.pow(2, retryCount); // Exponential backoff
                    console.warn(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime)); // Wait before retrying
                    retryCount++;
                    continue; // Retry the request
                }
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
            return; // Exit the function if successful
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error: Unable to get response from the bot. ' + error.message, 'Bot', 'bot');
            return; // Exit the function on error
        }
    }

    appendMessage('Error: Maximum retries reached. Please try again later.', 'Bot', 'bot');
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
                appendMessage(choice.message.content.trim(), 'Bot', 'bot'); // Display the bot's response text
                messageHistory.push({ role: 'assistant', content: choice.message.content.trim() }); // Record bot response
            } else {
                appendMessage('No response text found in choices.', 'Bot', 'bot');
            }
        } else if (data.error) {
            // Check if the response has an 'error' property
            appendMessage(`Error: ${data.error.message}`, 'Bot', 'bot');
        } else if (data.result) {
            // Check if the response has a 'result' property
            appendMessage(data.result.response || 'No response available.', 'Bot', 'bot');
        } else {
            // Handle unexpected response format
            appendMessage('Unexpected response format. Check console for details.', 'Bot', 'bot');
        }
    } else if (typeof data === 'string') {
        appendMessage(data, 'Bot', 'bot');
    } else {
        appendMessage('Unexpected response format.', 'Bot', 'bot');
    }
};

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Show a welcome message on load only once
if (messageHistory.length === 0) {
    appendMessage("Welcome to Dar's AI BOT! How can I assist you today?", 'Bot', 'bot');
}
