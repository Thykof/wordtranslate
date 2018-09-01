var form = document.getElementById("form-config");
form.addEventListener("submit", changeOutput, false);

function changeOutput() {
  var newLang = document.getElementById("lang").value;
  window.OutputLang = newLang;
  var text = "un message du script de la popup vers le content_scripts";

  // sendToContentScript(text);
}

// browser.runtime.onMessage.addListener((message) => {
//   alert("message recu!");
//   document.getElementById("result").innerHTML = message.result;
// });

// function addNode(text) {
//   var node = document.createElement("P");
//   var textnode = document.createTextNode(text);
//   node.appendChild(textnode);
//   var errorDiv = document.getElementById("error");
//   errorDiv.appendChild(node);
//
//   // var errorDiv = document.getElementById("error-p");
//   // errorDiv.innerHTML += "changeOutput";
// }


/////////////////////// send message to content_scripts
function sendToContentScript(text) {
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {message: text});
  });
}
