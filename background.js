browser.menus.create(
	{
		id: "wordtranslate",
		title: "wordtranslate",
		contexts: ["selection"]
	}
);

browser.menus.create(
	{
		id: "result",
		title: "[result here]",
		contexts: ["selection"]
	}
);

browser.menus.create(
	{
		id: "Yandex",
		title: "Powered by Yandex.Translate",
		contexts: ["selection"]
	}
);

function updateItem (new_title) {
	browser.menus.update("result", {
		title: new_title,
    });
}

function fetchSync (url) {
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			updateItem(data['text'][0]);
		})
		.catch(function(error) {
			console.log("Fetch error: " + url + " " + error)
			console.log(data);
		});
}

function getResult(text) {
	if(text != "") {
		key = "key";
		var lang_code = "fr";
		var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang_code;
	  var data = fetchSync(url);
	}
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "wordtranslate":
			console.log("Translate");
	  	getResult(info.selectionText);
      break;
    case "Yandex":
	  	showYandex();
      break;
  }
});


/////////////////////////////// receive message from content_scripts (and send response)
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " + request.greeting);
  sendResponse({response: "Response from background script"});
	updateItem(request.result);
}
browser.runtime.onMessage.addListener(handleMessage);
