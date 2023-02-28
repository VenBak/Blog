const edit = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;

  // Send a post request to the back end when wanting to edit a post
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // Change the location to the dashboard
  document.location.replace('/dashboard');
};

// Event listener for the new post button which is the same as the one for the create post
const editbtn = document.querySelector('#new-post')

editbtn.addEventListener('submit', edit);
