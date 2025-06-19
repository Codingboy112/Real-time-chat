let elements = {
  fatherElements: document.querySelector(".top_chats"),
  sendMessage: document.querySelector("#sendMessage"),
  inputUserName: document.querySelector(".inputUserName"),
  inputUserMessage: document.querySelector(".inputUserMessage"),
};

elements.sendMessage.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    elements.inputUserMessage.value.trim() == "" ||
    elements.inputUserName.value.trim() == ""
  )
    return;

  fetch("https://realtime-b05f4-default-rtdb.firebaseio.com/messages.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: elements.inputUserName.value,
      message: elements.inputUserMessage.value,
      timestamp: Date.now(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getMessage();
    });
  elements.inputUserMessage.value = ""
  elements.inputUserName.value = ""
});

function getMessage() {
  fetch("https://realtime-b05f4-default-rtdb.firebaseio.com/messages.json")
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        elements.fatherElements.innerHTML = "";
        for (let key in data) {
          let hourSent = new Date(data[key].timestamp)

          elements.fatherElements.insertAdjacentHTML(
            "beforeend",
            `
                  <div class="message">
            <strong><p id="userName">${data[key].username}</p></strong>
            <span>${hourSent.getHours()}:${hourSent.getMinutes()}</span>
            <p id="userMessage">
             ${data[key].message}
            </p>
          </div>
            `
          );
        }
      }
    });
}

getMessage();

setInterval(() => {
  getMessage();
}, 2000);
