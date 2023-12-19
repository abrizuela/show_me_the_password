/**
 * selectors
 */
const UPDATE_MESSAGE = document.querySelector("#updatedMessage");
const ERROR_MESSAGE = document.querySelector("#errorMessage");
const LEAVE_SHOWN = document.querySelector("#leaveShown");
const SHOW_WITH_BUTTON = document.querySelector("#showWithButton");
const SHOW_ALWAYS = document.querySelector("#showAlways");
const SHOW_ON_FOCUS = document.querySelector("#showOnFocus");
const SHOW_ON_HOVER = document.querySelector("#showOnHover");

/**
 * Show (and hide) a message
 */
async function showMessage(elem) {
    elem.classList.replace("hidden", "shown");
    setTimeout(function () { elem.classList.replace("shown", "hidden"); }, 4000);
}

/**
 * Show and hide a message when the changes are saved
 */
async function messageUpdated() {
    showMessage(UPDATE_MESSAGE);
}

function onError(e) {
    console.error("***Error: " + e);
};

async function diasbleCheckbox() {
    LEAVE_SHOWN.disabled = SHOW_WITH_BUTTON.checked ? false : true;
};

/**
 * Leave Shown
 */
browser.storage.sync.get("leaveShown").then((item) => {
    if (item.leaveShown === undefined || item.leaveShown === true) {
        LEAVE_SHOWN.checked = true;
    }
});

LEAVE_SHOWN.onchange = (elem) => {
    browser.storage.sync.set({ leaveShown: elem.target.checked });
    messageUpdated();
};

/**
 * Show Type
 */
browser.storage.sync.get("showType").then((item) => {
    switch (item.showType) {
        case "showWithButton":
            SHOW_WITH_BUTTON.checked = true;
            break;
        case "showAlways":
            SHOW_ALWAYS.checked = true;
            break;
        case "showOnFocus":
            SHOW_ON_FOCUS.checked = true;
            break;
        case "showOnHover":
            SHOW_ON_HOVER.checked = true;
            break;
        default:
            SHOW_WITH_BUTTON.checked = true;
            break;
    };
    diasbleCheckbox();
});

var showTypeOptions = document.querySelectorAll("#showWithButton, #showAlways, #showOnFocus, #showOnHover");
showTypeOptions.forEach(showType => {
    showType.onchange = (elem) => {
        browser.storage.sync.set({ showType: elem.target.value });
        diasbleCheckbox();
        messageUpdated();
    }
});