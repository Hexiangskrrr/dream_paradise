document.getElementById("camera").addEventListener("click", () => {
  window.location.href = "camera.html";
});

document.getElementById("data").addEventListener("click", () => {
  window.location.href = "data.html";
});

document.getElementById("schedule").addEventListener("click", () => {
  window.location.href = "schedule.html";
});

document.getElementById("profile").addEventListener("click", () => {
  window.location.href = "profile.html";
});

getChat();

document.getElementById("send").addEventListener("click", () => {
  const qn = document.getElementById("question").value;
  const id = sessionStorage.getItem("userid");

  userData = {
    id: id,
    qn: qn,
  };

  const chatContainer = document.getElementById("chat-container");
  const userMessage = document.createElement("div");
  userMessage.innerText = `You: ${qn}`;
  chatContainer.appendChild(userMessage);
  // Clear the input field
  document.getElementById("question").value = "";

  fetch("http://localhost:5001/chat", {
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
    .then((data) => {
      const aiMessage = document.createElement("div");
      aiMessage.innerText = `AI: ${data}`;
      chatContainer.appendChild(aiMessage);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function getChat() {
  const userData = {
    id: sessionStorage.getItem("userid"),
  };
  fetch("http://localhost:5001/getchat", {
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
      return response.json();
    })
    .then((data) => {
      // Append each question and answer pair to the chat container
      const chatContainer = document.getElementById("chat-container");
      data.forEach((message) => {
        const userMessage = document.createElement("div");
        userMessage.innerText = `You: ${message.question}`;
        const aiMessage = document.createElement("div");
        aiMessage.innerText = `AI: ${message.answer}`;
        chatContainer.appendChild(userMessage);
        chatContainer.appendChild(aiMessage);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
