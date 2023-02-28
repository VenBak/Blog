const login = async function(event) {
    eevent.preventDefault()

    const username = document.querySelector('#username-login');
    const password = document.querySelector('#password-login');
  
// Save the value of the password into the database
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  // If the status is good send the user back to the dashboard else tell them they failed to login
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
  
};
  
const submit = document.querySelector('#login');

submit.addEventListener('submit', login);
  