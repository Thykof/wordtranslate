var outputLanguage = "fr";

function clickCallback(){
	var selection = window.getSelection().toString();
	getResult(selection);
}

window.addEventListener("click", clickCallback);

function fetchSync (url) {
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			handleResult(data['text'][0]);
		})
		.catch(function(error) {
			console.log("Fetch error: " + url + " " + error);
			console.log(data);
		});
}

// async function fetchAsync (url) {
//   let response = await fetch(url);
//   let data = await response.json();
//   return data;
// }

function handleResult(result) {
	var sending = browser.runtime.sendMessage({result: result});
  sending.then(handleResponse, handleError);
}

// async function handleResultAsync(data) {
// 	console.log(data);
// 	var sending = browser.runtime.sendMessage({result: result});
//   sending.then(handleResponse, handleError);
// }

function getResult(text) {
	if(text != "") {
		key = "key";
		console.log(outputLanguage);
		var lang_code = outputLanguage;
		var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang_code;
	  var data = fetchSync(url);
		// fetchAsync(url)
    // 	.then(data => handleResultAsync(data))
		// 	.catch(reason => console.log(reason.message))
	}
}

//////////////////////////////// send message to background (and receive response)
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}
function handleError(error) {
  console.log(`Error: ${error}`);
}

///////////////////////////////////// listen message from wordtranslate.js
function onReceive(request, sender, sendResponse) {
	// console.log(`message from script to content_scripts: ${request.message}`);
	outputLanguage = request.message;
}
browser.runtime.onMessage.addListener(onReceive);
