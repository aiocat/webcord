chrome.storage.sync.get(["WEBCORD_CSS"], function (res) {
  document.getElementById("css-box").value = res["WEBCORD_CSS"];
});

document.getElementById("inject").onclick = async () => {
  let textCss = document.getElementById("css-box").value;
  chrome.storage.sync.set({ WEBCORD_CSS: textCss }, function () {});
};
