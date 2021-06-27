let loginForm, signupForm, errorDiv;

function setupPage() {
	signupForm.style.display = "none";
	loginForm.style.display = "block";
	errorDiv.style.display = "none";
}

function showRegister() {
	loginForm.style.display = "none";
	signupForm.style.display = "block";
}

function showLogin() {
	loginForm.style.display = "block";
	signupForm.style.display = "none";
}

window.addEventListener('load', (event) => {
	//set up the variables
	loginForm = document.querySelector('#login-form');
	signupForm = document.querySelector('#signup-form');
	errorDiv = document.querySelector('#error');

	setupPage();
	//add an event listener to the click

	const registerElement = document.querySelector('.register');
	registerElement.addEventListener('click',function() {
		showRegister();
	});

	const loginElement = document.querySelector('.login');
	loginElement.addEventListener('click', function() {
		showLogin();
	});

	//handle the button clicks
	//login
	document.querySelector('#login').addEventListener('click', function(e){
		e.preventDefault();
		const email = document.querySelector('#email-login').value.trim();
		const password = document.querySelector('#password-login').value.trim();
		errorDiv.style.display = "none";

		if (email && password) {
			fetch('/api/users/login', {
				method: 'post',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then((results) => {
				if (results.message){
					errorDiv.style.display = "block";
					errorDiv.innerHTML = results.message;
				}
				setTimeout(function () {
					document.location.replace('/dashboard')
				}, 3000);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	})

	//register
	document.querySelector('#signup').addEventListener('click', function(e){
		e.preventDefault();

		const email = document.querySelector('#email-signup').value.trim();
		const username = document.querySelector('#username-signup').value.trim();
		const password = document.querySelector('#password-signup').value.trim();

		if (email && username && password) {
			fetch('/api/users', {
				method: 'post',
				body: JSON.stringify({
					email,
					username,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(() => document.location.replace('/dashboard'))
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	})
});
