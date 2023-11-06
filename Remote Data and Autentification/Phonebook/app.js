function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    const uri = 'http://localhost:3030/jsonstore/phonebook/';
    const ulPhonebook = document.getElementById('phonebook');
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    async function onCreate(e) {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        const responce = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person,
                phone
            })
        });
        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
        onLoad(e);
    }

    async function onLoad(e) {
        ulPhonebook.innerHTML = '';
        const responce = await fetch(uri);
        const data = await responce.json();
        Object.values(data).forEach(row => {
            const li = createDomElement('li', `${row._id}`, `${row.person}: ${row.phone}`);
            const deleteBtn = createDomElement('button', 'deleteBtn', 'Delete');
            deleteBtn.addEventListener('click', onDelete);
            li.appendChild(deleteBtn);
            ulPhonebook.appendChild(li);
        });


    }

    async function onDelete(e) {
        const target = e.target;
        let currentId = target.parentElement.id;
        fetch(uri + currentId, {
            method: 'DELETE'
        });
    }

    function createDomElement(type, id, text) {
        let el = document.createElement(type);

        if (id) {
            el.setAttribute('id', id);
        }
        if (text) {
            el.textContent = text;
        }
        return el;
    }
}

attachEvents();
