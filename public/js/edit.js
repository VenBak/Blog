const postId = document.querySelector('#post-id').value;

const edit = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;

  // send an update request to the back with the matching postId
  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Replace the location to the dashboard
  document.location.replace('/dashboard');
};

// For deleting a post simply call a delete method
const deleted = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });
  document.location.replace('/dashboard');
};

// Event listeners for the buttons
const editPost = document.querySelector('#edit-post');

editPost.addEventListener('submit', edit);

const deletePost = document.querySelector('#delete-btn');
  
deletePost.addEventListener('click', deleted);