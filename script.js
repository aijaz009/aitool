$(document).ready(function() {
    $('#chat-form').on('submit', function(event) {
        event.preventDefault();

        const message = $('#message').val().trim();
        if (!message) {
            alert('Please enter a message.');
            return;
        }

        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', // Ensure this URL is correct
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO', // Ensure API key is correct
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com', // Ensure this matches the API host
                'Content-Type': 'application/json'
            },
            processData: false,
            data: JSON.stringify({
                messages: [{ role: 'user', content: message }],
                system_prompt: '',
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            })
        };

        console.log('Sending request with settings:', settings);

        $.ajax(settings)
            .done(function(response) {
                console.log('API Response:', response);
                if (response && response.choices && response.choices.length > 0) {
                    $('#response-text').text(response.choices[0].message.content);
                } else {
                    $('#response-text').text('No response data available.');
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Request failed:', textStatus, errorThrown);
                $('#response-text').text('Error: ' + textStatus + ', ' + errorThrown);
            });
    });
});
