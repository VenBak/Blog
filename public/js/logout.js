const logout = async function() {
  // Send a post request to the logout backend
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // If the status is good send them back to the main handlepars page
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Unable to log out');
  }
};

// Event listener for the buttton
const logoutbtn = document.querySelector('#logout-btn')

logoutbtn.addEventListener('click', logout);