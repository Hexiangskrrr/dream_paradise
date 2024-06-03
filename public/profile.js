document.getElementById("camera").addEventListener("click", () => {
  window.location.href = "camera.html";
});

document.getElementById("data").addEventListener("click", () => {
  window.location.href = "data.html";
});

document.getElementById("schedule").addEventListener("click", () => {
  window.location.href = "schedule.html";
});

document.getElementById("chatbot").addEventListener("click", () => {
  window.location.href = "chatbot.html";
});

document.getElementById("edit").addEventListener("click", () => {
  window.location.href = "editProfile.html";
});

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

const userid = {
  id: sessionStorage.getItem("userid"),
};

fetch("http://localhost:5001/profile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userid),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return response.json();
  })
  .then((userData) => {
    document.getElementById("name").innerText = userData.name;
    document.getElementById("username").innerText = userData.username;
    document.getElementById("age").innerText = userData.age;
    document.getElementById("email").innerText = userData.email;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
