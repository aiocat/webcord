document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        chrome.storage.sync.get(["WEBCORD_CSS"], function (res) {
            let style = document.createElement("style"),
                head = document.head || document.getElementsByTagName("head")[0];

            style.id = "WEBCORD_STYLE";
            style.appendChild(document.createTextNode(res["WEBCORD_CSS"]));
            head.appendChild(style);
        });
    }
};
