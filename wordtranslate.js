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
		title: "result...",
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

function callback(arg) {
	console.log("callback");
}

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function fetchSync (url) {
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
	}).catch(function() {
		console.log("Booo");
	});
}


function updateItem (result) {
	console.log(result);
	console.log(result['text']);
	console.log(result['text'][0]);
	
	browser.menus.update("result", {
		title: result['text'][0],
    });
}


function getResult(text) {
	
	var key = "trnsl.1.1.20180901T094046Z.8c594d68da93934a.235de79b3689fd9b65f3a6d7e7fd9e314869af07";
	var lang_code = "fr";
	
	var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang="+lang_code; + "callback=" + "callback";
	var data = fetchSync(url);
	var result;
	
	fetch(url).then(r => r.json())
		.then(data => updateItem(data))
		.catch(e => console.log("Booo"))

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
    case "result":
      console.log(info.selectionText);
	  getResult(info.selectionText);
      break;
    case "Yandex":
	  console.log("Powered by Yandex.Translate");
	  showYandex();
      break;
  }
});

