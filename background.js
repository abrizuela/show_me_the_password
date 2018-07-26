function onError(e) {
  console.log("***Error: " + e);
};

function update(details) {
  if (details.reason === "install" || details.reason === "update") {
    var opening = browser.runtime.openOptionsPage();
    opening.then(onOpened, onError);
  }
};

browser.runtime.onInstalled.addListener(update);