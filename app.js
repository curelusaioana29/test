document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    const user = { name, number, email, address };

    const method = userId ? "PUT" : "POST";
    const url = userId ? `/api/users/${userId}` : "/api/users";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        loadUsers();
        document.getElementById("userForm").reset();
        document.getElementById("userId").value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function loadUsers() {
  fetch("/api/users")
    .then((response) => response.json())
    .then((users) => {
      const usersList = document.getElementById("usersList");
      usersList.innerHTML = "";
      users.forEach((user) => {
        const userItem = document.createElement("div");
        userItem.className = "user-item";
        userItem.innerHTML = `
                    <span>${user.name} - ${user.email}</span>
                    <button onclick="editUser('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                `;
        usersList.appendChild(userItem);
      });
    });
}

function deleteUser(userId) {
  fetch(`/api/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Deleted:", data);
      loadUsers();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editUser(userId) {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      document.getElementById("name").value = user.name;
      document.getElementById("number").value = user.number;
      document.getElementById("email").value = user.email;
      document.getElementById("address").value = user.address;
      document.getElementById("userId").value = user._id;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

loadUsers();
