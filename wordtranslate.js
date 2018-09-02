///////////////////// On scipt load
ReqLanguages();

////////////////////////////// Set languages: add each choicies to select DOM.
function ReqLanguages() {
  var key = "key";
  var url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=" + key +"&ui=en";
  fetchSync(url);
}

function fetchSync (url) {
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			setLang(data);
		})
		.catch(function(error) {
			console.log("Fetch error: " + url + " " + error);
			console.log(data);
		});
}

function setLang(data) {
  var langs = data['langs'];
  var x = document.getElementById("select-lang");
  var o;
  for (var key in langs) {
    if (langs.hasOwnProperty(key)) {
        o = document.createElement("option");
        o.value = key;
        o.text = langs[key];
        if(key == 'fr') {
          o.selected = "selected";
        }
        x.add(o);
    }
  }
}

/////////////////////// send message to content_scripts
function sendMessage(tabs) {
  console.log("sendMessage");
  console.log(tabs);
  browser.tabs.sendMessage(tabs[0].id, {message: text}); // text is undefined
}

function ShowError(error) {
  console.log(error);
}

function sendToContentScript(text) {
  browser.tabs.query({active: true, currentWindow: true})
    .then(sendMessage, ShowError);

  var gettingCurrent = browser.tabs.getCurrent()
  console.log(gettingCurrent);
  gettingCurrent.then(sendMessage);

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  console.log(gettingActiveTab);
  gettingActiveTab.then((tabs) => {
    console.log(tabs);
    browser.tabs.sendMessage(tabs[0].id, {message: text});
  });
}
