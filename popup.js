document.getElementById("inject").onclick = async () => {
    let textCss = document.getElementById("css-box").value;
    chrome.storage.sync.set({ "WEBCORD_CSS": textCss }, function () { });
};
