<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dar's AI BOT</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="chatbot-container">
            <div class="chatbot-header">
                <img src="https://via.placeholder.com/150/007bff/ffffff?text=Dar's+AI+BOT" alt="Dar's AI BOT Logo" class="logo">
                <h2 class="chat-name">Dar's AI BOT</h2>
            </div>
            <div class="chatbot-content">
                <div class="chatbox" id="chatbox">
                    <div class="message bot">
                        <div class="avatar">
                            <img src="https://via.placeholder.com/50/4CAF50/ffffff?text=Bot" alt="Bot Avatar">
                        </div>
                        <div class="content">
                            <p>Welcome to Dar's AI BOT! How can I assist you today?</p>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <input type="text" id="userInput" placeholder="Type your message..." />
                    <button id="sendBtn">Send</button>
                </div>
            </div>
        </div>
    </div>

    <script src="chatbot.js"></script>
</body>
</html>
