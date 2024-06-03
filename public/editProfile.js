const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const username = document.getElementById("username").value;

  const userData = {
    id: 1,
    name: name,
    age: age,
    username: username,
  };

  fetch("http://localhost:5001/editprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to edit");
      }
      return response.text();
    })
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert("Failed to edit profile");
    });
});
