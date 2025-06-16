const form = document.getElementById("registration-form");
const tableBody = document.querySelector("#entries-table tbody");

function getEntries() {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function displayEntries() {
  const entries = getEntries();
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    tableBody.appendChild(row);
  });
}

function isValidDob(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    return age - 1 >= 18 && age - 1 <= 55;
  }
  return age >= 18 && age <= 55;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isValidDob(dob)) {
    alert("Date of birth must be for age between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTerms
  };

  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));
  displayEntries();
  form.reset();
});

// Clear all saved entries and update display
function clearEntries() {
  localStorage.removeItem("user-entries");
  displayEntries();
}

// Initialize display
window.onload = displayEntries;
