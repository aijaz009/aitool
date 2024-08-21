$(document).ready(function() {
    $('#chat-form').on('submit', function(event) {
        event.preventDefault();

        // Get message and log it
        const message = $('#message').val().trim();
        if (!message) {
            console.log('No message provided.');
            alert('Please enter a message.');
            return;
        }

        console.log('Message to send:', message);

        // AJAX settings
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
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

        console.log('AJAX settings:', settings);

        // Perform AJAX request
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
                if (jqXHR.responseText) {
                    console.error('Response text:', jqXHR.responseText);
                }
            })
            .always(function() {
                console.log('AJAX request completed.');
            });
    });
});
