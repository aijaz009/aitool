// script.js

$(document).ready(function() {
    $('#send-button').click(function(e) {
        e.preventDefault();
        const body = $('#body-input').val().trim();
        if (body) {
            sendRequest(body);
            $('#body-input').val('');
        }
    });

    function sendRequest(body) {
        const data = {
            "messages": [
                {
                    "role": "user",
                    "content": body
                }
            ],
            "system_prompt": "",
            "temperature": 0.9,
            "top_k": 5,
            "top_p": 0.9,
            "max_tokens": 256,
            "web_access": false
        };

        const headers = {
            'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        };

        $.ajax({
            type: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            headers: headers,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'text',
            success: function(response) {
                console.log('API Response:', response);
                addMessageToChatLog(body, response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                addMessageToChatLog(body, 'Error: ' + error);
            }
        });
    }

    function addMessageToChatLog(userMessage, botResponse) {
        const userLi = $('<li class="user">You: ' + userMessage + '</li>');
        const botLi = $('<li class="bot">Bot: ' + botResponse + '</li>');
        $('#chat-log').append(userLi).append(botLi);
        $('#chat-log').scrollTop($('#chat-log')[0].scrollHeight);
    }
});
