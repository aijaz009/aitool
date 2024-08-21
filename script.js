const form = document.getElementById('api-form');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const headers = JSON.parse(document.getElementById('headers').value);
    const body = document.getElementById('body').value;

    fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
    .then((response) => response.json())
    .then((data) => {
        responseDiv.innerText = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
        responseDiv.innerText = error.message;
    });
});
