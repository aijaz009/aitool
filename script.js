<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Tester</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #api-tester {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 10px;
        }
        input[type="text"], textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            box-sizing: border-box;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #3e8e41;
        }
        #response {
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="api-tester">
        <h1>API Tester</h1>
        <form id="api-form">
            <label for="url">URL:</label>
            <input type="text" id="url" name="url" required>
            <label for="method">Method:</label>
            <select id="method" name="method">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
            </select>
            <label for="headers">Headers:</label>
            <textarea id="headers" name="headers"></textarea>
            <label for="body">Body:</label>
            <textarea id="body" name="body"></textarea>
            <button id="send-button">Send Request</button>
        </form>
        <div id="response"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
