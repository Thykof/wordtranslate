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

function showYandex () {
	var creating = browser.tabs.create({url: "http://translate.yandex.com/"})
}

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "Yandex":
	  	showYandex();
      break;
  }
});

/////////////////////////////// receive message from content_scripts (and send response)
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " + request.result);
  sendResponse({response: "Response from background script"});
	updateItem(request.result);
}
browser.runtime.onMessage.addListener(handleMessage);
