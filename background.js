chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete' && tabInfo.url) {
    if (tabInfo.url.includes('www.nytimes'))
      chrome.tabs.sendMessage(tabId, {
        site: 'nytimes'
      });
  }
});
