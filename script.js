$(document).ready(function() {
    $('#chat-form').on('submit', function(event) {
        event.preventDefault();

        // Get and trim the message input
        const message = $('#message').val().trim();
        if (!message) {
            console.log('No message provided.');
            alert('Please enter a message.');
            return;
        }

        // Log the message being sent
        console.log('Message to send:', message);

        // AJAX request settings
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', // API endpoint
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO', // API key
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com', // API host
                'Content-Type': 'application/json' // Content type
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

        // Log the AJAX request settings
        console.log('AJAX settings:', settings);

        // Make the AJAX request
        $.ajax(settings)
            .done(function(response) {
                // Log the successful response
                console.log('API Response:', response);
                
                // Process and display the response
                if (response && response.choices && response.choices.length > 0) {
                    $('#response-text').text(response.choices[0].message.content);
                } else {
                    $('#response-text').text('No response data available.');
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Log detailed error information
                console.error('Request failed:', textStatus, errorThrown);
                $('#response-text').text('Error: ' + textStatus + ', ' + errorThrown);
                if (jqXHR.responseText) {
                    console.error('Response text:', jqXHR.responseText);
                }
                // Display a user-friendly error message
                $('#response-text').text('An error occurred. Please check the console for details.');
            })
            .always(function() {
                // Log completion of the request, regardless of success or failure
                console.log('AJAX request completed.');
            });
    });
});
