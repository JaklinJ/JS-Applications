function attachEvents() {
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
    const textArea = document.getElementById('messages');
    refreshButton.addEventListener('click', load);
    sendButton.addEventListener('click', send);
    const uri = 'http://localhost:3030/jsonstore/messenger';

    async function load(e) {
        textArea.textContent = '';
        const responce = await fetch(uri);
        const data = await responce.json();
        Object.values(data).forEach(row => {
            textArea.textContent += `${row.author}: ${row.content}\n`
        });
        textArea.textContent = textArea.textContent.trim();
    }

    async function send(e) {
        const inputRef = document.querySelectorAll("#controls input[type='text']");
        const author = inputRef[0].value;
        const content = inputRef[1].value;

        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        });
        inputRef[0].value = '';
        inputRef[1].value = '';
    }
    
}

attachEvents();