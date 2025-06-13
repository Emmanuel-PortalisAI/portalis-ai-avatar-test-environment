function loadAvatar(event) {
  event.preventDefault();
  baseURL = document.querySelector("#baseURL").value + "?";

  params = document.querySelectorAll(".urlParam");

  Array.from(params).forEach((element) => {
    const key = element.querySelector(".keyInput").value;
    const value = element.querySelector(".valueInput").value;
    // Do something with key and value, e.g., log or build an object
    baseURL += `${key}=${value}&`;
  });
  baseURL = baseURL.slice(0, -1);

  document.querySelector(".portalis-iframe").src = baseURL;
  console.log(baseURL);
}

function saveLoadedAvatarURLtoLocalStorage() {}

let paramCount = 0;

function addParameter(event) {
  event.preventDefault();
  paramCount++;

  const urlParamsDiv = document.querySelector(".urlParams");
  const paramDiv = document.createElement("div");
  paramDiv.className = "urlParam";
  paramDiv.id = `param${paramCount}`;

  // Create key input
  const keyInput = document.createElement("input");
  keyInput.type = "text";
  keyInput.className = "keyInput";
  keyInput.name = `key_${paramCount}`;
  keyInput.placeholder = "key";

  // Create value input
  const valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.className = "valueInput";
  valueInput.name = `value_${paramCount}`;
  valueInput.placeholder = "value";

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.innerText = "-";
  deleteBtn.onclick = function (e) {
    urlParamsDiv.removeChild(paramDiv);
  };

  // Append inputs and button to paramDiv
  paramDiv.appendChild(keyInput);
  paramDiv.appendChild(valueInput);
  paramDiv.appendChild(deleteBtn);

  // Append paramDiv to urlParamsDiv
  urlParamsDiv.appendChild(paramDiv);
}
