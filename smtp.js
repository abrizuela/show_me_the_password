function showPassword(inputPass) {
  inputPass.type = "text";
};

function hidePassword(inputPass) {
  inputPass.type = "password";
};

function togglePassword (inputPass) {
    inputPass.type = inputPass.type == "password" ? "text" : "password";
};

function createSmtpButton (inputPass, num, leaveShown) {
  var smtpButton = document.createElement("img");
  smtpButton.id = "smtpButton"+num;
  smtpButton.src = browser.extension.getURL("icons/eye-icon-16.png");
  smtpButton.style.backgroundColor = "transparent";
  smtpButton.style.backgroundRepeat = "no-repeat";
  smtpButton.style.height = "16px";
  smtpButton.style.width = "16px";
  smtpButton.style.cursor = "pointer";
  smtpButton.style.zIndex = "100";
  if(inputPass.offsetParent.tagName == "TD") {
    smtpButton.style.position = "relative";
    var leftPosition = -20;
    var topPosition = (inputPass.offsetHeight-16)/2;
  } else {
    smtpButton.style.position = "absolute";
    var leftPosition = inputPass.offsetLeft+inputPass.offsetWidth-20;
    var topPosition = inputPass.offsetTop+(inputPass.offsetHeight-16)/2;
  };
  smtpButton.style.left = leftPosition+"px";
  smtpButton.style.top = topPosition+"px";
  
  var parentDiv = inputPass.parentNode;
  parentDiv.insertBefore(smtpButton, inputPass.nextSibling);
  
  if (leaveShown) {
      smtpButton.addEventListener("click", function () { togglePassword(inputPass); }, false);
  } else {
      smtpButton.addEventListener("mousedown", function () { showPassword(inputPass); }, false);
      smtpButton.addEventListener("mouseup", function () { hidePassword(inputPass); }, false);
  }
};

function addFocusBlurEventListeners (inputPass) {
  inputPass.addEventListener("focus", function () { showPassword(inputPass); }, false);
  inputPass.addEventListener("blur", function () { hidePassword(inputPass); }, false);
};

function addHoverEventListeners (inputPass) {
  inputPass.addEventListener("mouseenter", function () { showPassword(inputPass); }, false);
  inputPass.addEventListener("mouseleave", function () { hidePassword(inputPass); }, false);
};

function onError(error) {
  console.log("***Error***: " + error);
};

function showMeThePassword(showType, leaveShown) {
  try{
    var inputs = document.getElementsByTagName("input");
    for(var i=0; i< inputs.length; i++) {
      if (typeof inputs[i] !== "undefined" && inputs[i].type === "password") {
        switch (showType) {
          case "showWithButton":
            createSmtpButton(inputs[i], i, leaveShown);
            break;
          case "showAlways":
            inputs[i].type = "text";
            break;
          case "showOnFocus":
            addFocusBlurEventListeners(inputs[i]);
            break;
          case "showOnHover":
            addHoverEventListeners(inputs[i]);
            break;
        };
      };
    };
  } catch (e) {
    onError(e);
  };
};

function onGot(restoredSettings) {
  var leaveShown = true;
  if(restoredSettings.leaveShown !== undefined) {
    leaveShown = restoredSettings.leaveShown;
  };
  var showType = "showWithButton";
  if(restoredSettings.showType){
    showType = restoredSettings.showType;
  };
  showMeThePassword(showType, leaveShown);
};

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(onGot, onError);