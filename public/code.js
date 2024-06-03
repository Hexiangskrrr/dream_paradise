const codeBtn = document.getElementById("codeBtn");

codeBtn.addEventListener("click", () => {
  const code = document.getElementById("code").value;
  if (code === "123456") {
    window.location.href = "schedule.html";
  } else {
    window.alert("Invalid code!");
  }
});
