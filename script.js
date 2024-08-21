const settings = {
    async: true,
    crossDomain: true,
    url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
    method: 'POST',
    headers: {
        'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO', // Your API key
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    processData: false,
};

$(document).ready(function () {
    $('#sendBtn').click(function () {
        const userInput = $('#userInput').val();
        if (userInput) {
            appendMessage(userInput, 'user');
            $('#userInput').val(''); // Clear input field
            sendMessage(userInput);
        }
    });

    $('#userInput').keypress(function (e) {
        if (e.which === 13) { // Enter key
            $('#sendBtn').click();
        }
    });
});

function appendMessage(content, role) {
    const messageClass = role === 'user' ? 'user' : 'bot';
    $('#messages').append(`<div class="message ${messageClass}">${content}</div>`);
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight); // Scroll to bottom
}

function sendMessage(content) {
    const data = {
        messages: [{ role: "user", content: content }],
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
    };

    settings.data = JSON.stringify(data);

    $.ajax(settings).done(function (response) {
        console.log("API Response:", response); // Log the entire response for debugging
        if (response.choices && response.choices.length > 0) {
            const botResponse = response.choices[0].message.content; // Adjust according to API response structure
            appendMessage(botResponse, 'bot');
        } else {
            appendMessage("No response from the bot.", 'bot');
        }
    }).fail(function (error) {
        console.error("Error:", error);
        appendMessage("Sorry, something went wrong.", 'bot');
    });
}
