let comment;

function clearForm(){
	comment.value = '';
}

window.addEventListener('load', (event) => {
	//set up the variables
	comment = document.querySelector('#comment-body');

	clearForm();

	//add the event listeners
	document.querySelector('#add-comment').addEventListener('click', function(e){
		e.preventDefault();
		//get the values and post them to the backend
		const comment_text = comment.value;
		const post_id = window.location.toString().split('/')[	window.location.toString().split('/').length - 1];
		if (comment_text) {
			fetch('/api/comments', {
				method: 'post',
				body: JSON.stringify({
					comment_text,
					post_id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then((results) => {
					location.reload();
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	});
});
