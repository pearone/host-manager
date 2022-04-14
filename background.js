chrome.runtime.onInstalled.addListener((_reason) => {
    chrome.tabs.create({
        url: 'dist/index.html'
    });
});
