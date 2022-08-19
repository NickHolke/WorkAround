function handleUpdated(tabId, changeInfo, tabInfo) {
  console.log(`Updated tab: ${tabId}`);
  console.log('Changed attributes: ', changeInfo);
  console.log('New tab Info: ', tabInfo);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete' && tabInfo.url) {
    if (tabInfo.url.includes('nytimes'))
      chrome.tabs.sendMessage(tabId, {
        site: 'nytimes'
      });
  }
});
