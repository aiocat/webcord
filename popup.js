chrome.storage.sync.get(["WEBCORD_CSS"], function (res) {
    document.getElementById("css-box").value = res["WEBCORD_CSS"];
});

document.getElementById("inject").onclick = async () => {
    let textCss = document.getElementById("css-box").value;
    chrome.storage.sync.set({ "WEBCORD_CSS": textCss }, function () {
        chrome.tabs.reload(function () { });
    });
};

document.getElementById("from-file").onclick = async () => {
    let file;
    let input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
        file = e.target.files[0];

        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (readerEvent) => {
            chrome.storage.sync.set({ "WEBCORD_CSS": readerEvent.target.result }, function () {
                document.getElementById("css-box").value = readerEvent.target.result; 
                chrome.tabs.reload(function () { });
            });
        };
    };

    input.click();
};

document.getElementById("reset").onclick = async () => {
    chrome.storage.sync.set({ "WEBCORD_CSS": "" }, function () {
        document.getElementById("css-box").value = ""; 
        chrome.tabs.reload(function () { });
    });
};
