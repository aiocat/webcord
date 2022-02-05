const handleBigData = async (str) => {
    if (str.length < 4000) return str

    let result = await fetch("https://www.toptal.com/developers/cssminifier/raw", {
        method: "POST",
        body: new URLSearchParams(`input=${str}`),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    if (!result.ok) return str
    let minified = await result.text()

    return minified
}

chrome.storage.sync.get(["WEBCORD_CSS"], function (res) {
    document.getElementById("css-box").value = res["WEBCORD_CSS"];
});

document.getElementById("inject").onclick = async () => {
    let textCss = await handleBigData(document.getElementById("css-box").value);
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

        reader.onload = async (readerEvent) => {
            let cssData = await handleBigData(readerEvent.target.result)
            chrome.storage.sync.set({ "WEBCORD_CSS": cssData }, function () {
                document.getElementById("css-box").value = cssData;
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
