const registrationForm = document.getElementById('registrationForm');
const usersTableBody = document.getElementById('usersTableBody');

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('terms').checked ? 'true' : 'false';
  if (!isAgeValid(dob)) {
    alert('Age should be between 18 and 55 years old.');
    return;
  }
  const userData = { name, email, password, dob, acceptedTerms };
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  existingUsers.push(userData);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  displayUsers();
  registrationForm.reset();
});
function isAgeValid(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}

function displayUsers() {
  usersTableBody.innerHTML = '';
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  existingUsers.forEach(user => {
    const row = document.createElement('tr');
    Object.values(user).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    usersTableBody.appendChild(row);
  });
}

window.addEventListener('load', displayUsers);
