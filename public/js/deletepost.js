let deleteButton;

window.addEventListener('load', (event) => {
	//set up the variables
	deleteButton = document.querySelector('#delete-post');

	deleteButton.addEventListener('click', function (e) {
		e.preventDefault();

		const post_id = window.location.toString().split('/')[	window.location.toString().split('/').length - 1];

		if (post_id) {
			fetch(`/api/posts/${post_id}`, {
				method: 'delete',
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
