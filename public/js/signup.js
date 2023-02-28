const signup = async function(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup');
  const password = document.querySelector('#password-signup');

  // Send the information put in to the html to the backend
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  // If the status is good send the user to the dashboard page
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Unable to sign up');
  }
};

// Event listener for the sign up button

const signupbtn = document.querySelector('#signup-form');

signupbtn.addEventListener('submit', signup);
