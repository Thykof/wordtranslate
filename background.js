var url_to_yandex;

browser.menus.create(
	{
		id: "wordtranslate",
		title: "wordtranslate",
		contexts: ["selection"],
		icons: {
			"48": "icons/icon48.png",
	    "64": "icons/icon64.png",
	    "640": "icons/icon.png"
		}
	}
);

browser.menus.create(
	{
		id: "result",
		title: "...",
		contexts: ["selection"]
	}
);

browser.menus.create(
	{
		id: "Yandex",
		title: "Powered by Yandex.Translate",
		contexts: ["selection"],
		icons: {
			"200": "icons/yandex_logo.png"
		}
	}
);

function updateItem (result) {
	browser.menus.update("result", {
		title: result,
    });
}

function OpenTab (url) {
	browser.tabs.create({url: url})
}

browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
    case "result":
	  	OpenTab(url_to_yandex);
      break;
  }
  switch (info.menuItemId) {
    case "Yandex":
			OpenTab("http://translate.yandex.com/");
      break;
  }
});

/////////////////////////////// receive message from content_scripts (and send response)
function handleMessage(request, sender, sendResponse) {
  // console.log("Message from the content script: " + request.result);
  // sendResponse({response: "Response from background script"});
	updateItem(request.result);
	url_to_yandex = "https://translate.yandex.com/?text=" + request.text + "&lang=" + request.lang;
}
browser.runtime.onMessage.addListener(handleMessage);
