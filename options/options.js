function onError(e) {
  console.error("***Error: " + e);
};

function diasbleCheckbox () {
  if(document.querySelector("#showWithButton").checked) {
    document.querySelector("#leaveShown").disabled = false;
  } else {
    document.querySelector("#leaveShown").disabled = true;
  }
};

//
// Leave Shown
//
browser.storage.local.get("leaveShown").then(function(item){
	if (item.leaveShown === undefined || item.leaveShown === true) {
		document.querySelector("#leaveShown").checked = true;
  }
});

document.querySelector("#leaveShown").onchange = function(e) {
	if (this.checked) {
		browser.storage.local.set({ leaveShown: true });
	} else {
		browser.storage.local.set({ leaveShown: false });
	}
};

//
// Show Type
//

browser.storage.local.get("showType").then(function(item){
	if (item.showType === undefined || item.showType === "showWithButton") {
		document.querySelector("#showWithButton").checked = true;
	} else if (item.showType === "showAlways") {
		document.querySelector("#showAlways").checked = true;
	} else if (item.showType === "showOnFocus") {
		document.querySelector("#showOnFocus").checked = true;
	}
});

var showType_options = document.querySelectorAll("#showWithButton, #showAlways, #showOnFocus");
for (i = 0; i < showType_options.length; i++) {
	showType_options[i].onchange = function(e) {
    browser.storage.local.set({ showType: this.value });
    diasbleCheckbox();
	}
};

document.addEventListener("DOMContentLoaded", function () { diasbleCheckbox(); }, false);