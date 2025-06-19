function loadAvatar(event) {
  event.preventDefault();
  baseURL = document.querySelector("#baseURL").value;

  params = document.querySelectorAll(".urlParam");

  Array.from(params).forEach((element) => {
    const key = element.querySelector(".keyInput").value;
    const value = element.querySelector(".valueInput").value;
    // Do something with key and value, e.g., log or build an object
    baseURL += `&${key}=${value}`;
  });
  if (paramCount < 1) {
    baseURL = baseURL.slice(0, -1);
  }

  document.querySelector(".portalis-iframe").src = baseURL;

  saveLoadedAvatarURLtoLocalStorage();
  console.log(baseURL);
}

function saveLoadedAvatarURLtoLocalStorage() {
  // Get the current baseURL from the input field
  const baseURL = document.querySelector("#baseURL").value;

  // Get all current parameters
  const params = document.querySelectorAll(".urlParam");
  const urlParams = [];

  // Build array of parameters
  Array.from(params).forEach((element) => {
    const key = element.querySelector(".keyInput").value;
    const value = element.querySelector(".valueInput").value;
    if (key && value) {
      // Only save non-empty parameters
      urlParams.push({ key, value });
    }
  });

  // Create the complete URL (same logic as loadAvatar)
  let completeURL = baseURL;
  urlParams.forEach((param) => {
    completeURL += `&${param.key}=${param.value}`;
  });

  // Remove trailing '&' if parameters exist
  if (urlParams.length > 0 && completeURL[completeURL.length - 1] === "&") {
    completeURL = completeURL.slice(0, -1);
  }

  // Save to localStorage
  const avatarData = {
    baseURL: baseURL,
    parameters: urlParams,
    completeURL: completeURL,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem("savedAvatarURL", JSON.stringify(avatarData));

  console.log("Avatar URL saved to localStorage:", completeURL);
}

function loadSavedAvatarURL() {
  const savedData = localStorage.getItem("savedAvatarURL");

  if (savedData) {
    const avatarData = JSON.parse(savedData);

    // Set the base URL

    document.querySelector("#baseURL").value = avatarData.baseURL;

    // Clear existing parameters
    clearParameters(new Event("click"));

    // Recreate saved parameters
    avatarData.parameters.forEach((param) => {
      addParameter(new Event("click"));
      const lastParam = document.querySelector(".urlParam:last-child");
      lastParam.querySelector(".keyInput").value = param.key;
      lastParam.querySelector(".valueInput").value = param.value;
    });

    // Load the iframe with the saved complete URL
    document.querySelector(".portalis-iframe").src = avatarData.completeURL;

    console.log("Avatar URL loaded from localStorage");
  } else {
    console.log("No saved avatar URL found");
  }
}

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
    paramCount -= 1;
    urlParamsDiv.removeChild(paramDiv);
  };

  // Append inputs and button to paramDiv
  paramDiv.appendChild(keyInput);
  paramDiv.appendChild(valueInput);
  paramDiv.appendChild(deleteBtn);

  // Append paramDiv to urlParamsDiv
  urlParamsDiv.appendChild(paramDiv);
}

function clearParameters(event) {
  event.preventDefault();
  paramCount = 0;
  console.log("I Am Here");
  let arrOfURLParams = document.querySelectorAll(".urlParam");

  arrOfURLParams.forEach((param) => {
    param.remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadSavedAvatarURL();
});
