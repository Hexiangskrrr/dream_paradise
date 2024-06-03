const signUpButton = document.getElementById("signUpBtn");
const signInButton = document.getElementById("signInBtn");

signUpButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("userid", data.userid);
      window.location.href = "code.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert("Failed to sign up");
    });
});

signInButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("userid", data.userid);
      window.location.href = "code.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      window.alert("Failed to sign in");
    });
});
