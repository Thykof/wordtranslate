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

// async function fetchAsync (url) {
//   let response = await fetch(url);
//   let data = await response.json();
//   return data;
// }

function fetchSync (url) {
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(data) {
		updateItem(data['text'][0]);
	}).catch(function() {
		console.log("Fetch error");
	});
}


function updateItem (new_title) {
	browser.menus.update("result", {
		title: new_title,
    });
}


function getResult(text) {
	
	var key = "trnsl.1.1.20180901T094046Z.8c594d68da93934a.235de79b3689fd9b65f3a6d7e7fd9e314869af07";
	var lang_code = "fr";

	var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang_code; + "callback=" + "callback";
	var data = fetchSync(url);
}

function showYandex () {
	var creating = browser.tabs.create(
		{
			url: "http://translate.yandex.com/"
		}
	)
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

