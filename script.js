$(document).ready(function() {
    $('#chat-form').on('submit', function(event) {
        event.preventDefault();

        const message = $('#message').val();
        if (!message) {
            alert('Please enter a message.');
            return;
        }

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

        $.ajax(settings)
            .done(function(response) {
                $('#response-text').text(response.choices[0].message.content);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#response-text').text('Error: ' + textStatus + ', ' + errorThrown);
            });
    });
});
