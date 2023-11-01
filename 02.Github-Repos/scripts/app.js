function loadRepos() {
	let userName = document.getElementById('username').value;
	let ul = document.getElementById('repos');

	let baseUrl = 'https://api.github.com';

	fetch(baseUrl + "/users/" + userName + '/repos')
	.then((responce) => 
		responce.json()
	.then((data) => {
		ul.replaceChildren();
		data.forEach(element => {
			let li = document.createElement('li');
			li.textContent = `${element['full_name']}/${element['html_url']}`;
			ul.appendChild(li);
		});
	})).catch((err) => {
		let li = document.createElement('li');
		li.textContent = err.textContent;
		ul.appendChild(li);

	})

}