let saveButton, postTitle, postContent;

window.addEventListener('load', (event) => {
	//set up the variables
	saveButton = document.querySelector('#save-post');
	postTitle = document.querySelector('#post-title');
	postContent = document.querySelector('#post-content');

	saveButton.addEventListener('click', function (e) {
		e.preventDefault();

		const title = postTitle.value;
		const body = postContent.value;

		const post_id = window.location.toString().split('/')[	window.location.toString().split('/').length - 1];


		if (title && body) {
			fetch(`/api/posts/${post_id}`, {
				method: 'put',
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
					}, 1000);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	});
});
