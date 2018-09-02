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
  var select = document.getElementById("select-lang");
  var option;
  for (var key in langs) {
    if (langs.hasOwnProperty(key)) {
        option = document.createElement("option");
        option.value = key;
        option.text = langs[key];
        option.onclick = langChanged;
        select.add(option);
    }
  }
}

////////////////////////// Get language
function langChanged() {
  var select = document.getElementById("select-lang");
  var newLang = select.options[select.selectedIndex].value;
  sendToContentScript(newLang);
}

/////////////////////// send message to content_scripts
function sendToContentScript(text) {
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {message: text});
  }, (error) => {console.log(error);});
}
