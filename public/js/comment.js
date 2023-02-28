const comment = async function(event) {
    event.preventDefault();

    // Get the post and comment queries
    const postId = document.querySelector('#post').value;
    const body = document.querySelector('#comment').value;

    // Post them to the api/comment
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // reload the page
      document.location.reload();
    }
  };

var newComment = document.querySelector('#new-comment');

// event listener
newComment.addEventListener('submit', comment);
  