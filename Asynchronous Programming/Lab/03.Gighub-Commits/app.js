function loadCommits() {
    const userName = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    const ul = document.getElementById('commits');
    const url = `https://api.github.com/repos/${userName}/${repo}/commits`;
    fetch(url)
    .then(res => {
        if(res.status === 200) {
           return res.json()
        } else {
            throw new Error(`${response.status} ${response.statusText}`)
        }
    }).then((data) => {
        ul.replaceChildren();
        data.forEach(element => {
            let li = document.createElement('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`
            ul.appendChild(li);
        });
    }).catch((err) => {
        ul.replaceChildren();
        ul.textContent = err.message;
    })
}