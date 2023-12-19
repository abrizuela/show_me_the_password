const SHOW_TYPE = {
    WITH_BUTTON: "showWithButton",
    ALWAYS: "showAlways",
    ON_FOCUS: "showOnFocus",
    ON_HOVER: "showOnHover"
};

const INPUT_TYPE = {
    PASSWORD: "password",
    TEXT: "text"
}

function showPassword(inputPass) {
    inputPass.type = INPUT_TYPE.TEXT;
};

function hidePassword(inputPass) {
    inputPass.type = INPUT_TYPE.PASSWORD;
};

function togglePassword(inputPass) {
    inputPass.type = inputPass.type == INPUT_TYPE.PASSWORD ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;
};

function createSmtpButton(inputPass, num, leaveShown) {
    var smtpButton = document.createElement("img");
    smtpButton.id = `smtpButton${num}`;
    smtpButton.src = browser.runtime.getURL("icons/eye-icon-16.png");
    smtpButton.style.backgroundColor = "transparent";
    smtpButton.style.backgroundRepeat = "no-repeat";
    smtpButton.style.height = "16px";
    smtpButton.style.width = "16px";
    smtpButton.style.cursor = "pointer";
    smtpButton.style.zIndex = "100";
    if (inputPass.offsetParent.tagName == "TD") {
        smtpButton.style.position = "relative";
        var leftPosition = -20;
        var topPosition = (inputPass.offsetHeight - 16) / 2;
    } else {
        smtpButton.style.position = "absolute";
        var leftPosition = inputPass.offsetLeft + inputPass.offsetWidth - 20;
        var topPosition = inputPass.offsetTop + (inputPass.offsetHeight - 16) / 2;
    };
    smtpButton.style.left = `${leftPosition}px`;
    smtpButton.style.top = `${topPosition}px`;

    var parentDiv = inputPass.parentNode;
    parentDiv.insertBefore(smtpButton, inputPass.nextSibling);

    if (leaveShown) {
        smtpButton.addEventListener("click", () => togglePassword(inputPass), false);
    } else {
        smtpButton.addEventListener("mousedown", () => showPassword(inputPass), false);
        smtpButton.addEventListener("mouseup", () => hidePassword(inputPass), false);
    }
};

function addFocusBlurEventListeners(inputPass) {
    inputPass.addEventListener("focus", () => showPassword(inputPass), false);
    inputPass.addEventListener("blur", () => hidePassword(inputPass), false);
};

function addHoverEventListeners(inputPass) {
    inputPass.addEventListener("mouseenter", () => showPassword(inputPass), false);
    inputPass.addEventListener("mouseleave", () => hidePassword(inputPass), false);
};

function onError(error) {
    console.log(`***ERROR***: ${error}`);
};

function showMeThePassword(showType, leaveShown) {
    try {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (typeof inputs[i] !== "undefined" && inputs[i].type === INPUT_TYPE.PASSWORD) {
                switch (showType) {
                    case SHOW_TYPE.WITH_BUTTON:
                        createSmtpButton(inputs[i], i, leaveShown);
                        break;
                    case SHOW_TYPE.ALWAYS:
                        inputs[i].type = INPUT_TYPE.TEXT;
                        break;
                    case SHOW_TYPE.ON_FOCUS:
                        addFocusBlurEventListeners(inputs[i]);
                        break;
                    case SHOW_TYPE.ON_HOVER:
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
    var leaveShown = restoredSettings.leaveShown !== undefined ? restoredSettings.leaveShown : true;
    var showType = restoredSettings.showType !== undefined ? restoredSettings.showType : SHOW_TYPE.WITH_BUTTON;
    showMeThePassword(showType, leaveShown);
};

var gettingStoredSettings = browser.storage.sync.get();
gettingStoredSettings.then(onGot, onError);