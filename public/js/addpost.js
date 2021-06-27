let postTitle, postContent;

function clearForm(){
	postTitle.value = '';
	postContent.value = '';
}

window.addEventListener('load', (event) => {
	//set up the variables
	postTitle = document.querySelector('#post-title');
	postContent = document.querySelector('#post-content');

	clearForm();

	//add the event listeners
	document.querySelector('#create').addEventListener('click', function(e){
		e.preventDefault();
		//get the values and post them to the backend
		const title = postTitle.value;
		const body = postContent.value;

		if (title && body) {
			fetch('/api/posts', {
				method: 'post',
				body: JSON.stringify({
					title,
					body
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then((results) => {
				setTimeout(function () {
					document.location.replace('/dashboard')
				}, 3000);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	});
});
