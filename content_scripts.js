function clickCallback(){
	var selection = window.getSelection().toString();
	console.log("selection " + selection);
	getResult(selection);
}

document.body.onclick = clickCallback;

function showYandex () {
	var creating = browser.tabs.create(
		{
			url: "http://translate.yandex.com/"
		}
	)
}

function fetchSync (url) {
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			handleResult(data['text'][0]);
		})
		.catch(function(error) {
			console.log("Fetch error: " + url + " " + error)
			console.log(data);
		});
}

function handleResult(result) {
	console.log("result: " + result);
	var sending = browser.runtime.sendMessage({result: result});
  sending.then(handleResponse, handleError);
}

function getResult(text) {
	if(text != "") {
		key = "key";
		var lang_code = "fr";
		var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang_code;
	  var data = fetchSync(url);
	}
}

// window.addEventListener("click", clickCallback);
// browser.browserAction.onClicked.addListener(clickCallback);
// document.body.onClick = clickCallback;
// window.onclick = clickCallback

//////////////////////////////// send message to background (and receive response)

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var sending = browser.runtime.sendMessage({greeting: "Greeting from the content script"});
  sending.then(handleResponse, handleError);
}

// window.addEventListener("click", notifyBackgroundPage);

///////////////////////////////////// listen message from wordtranslate.js
function onReceive(request, sender, sendResponse) {
	console.log(`message from script to content_scripts: ${request.message}`);
  // browser.runtime.onMessage.removeListener(onReceive);
}
browser.runtime.onMessage.addListener(onReceive);
