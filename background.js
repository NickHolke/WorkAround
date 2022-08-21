chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete' && tabInfo.url) {
    const url = tabInfo.url;
    console.log(url);
    let site = '';
    if (url.includes('nytimes')) {
      site = 'nytimes';
    } else if (url.includes('nymag')) {
      site = 'nymag';
    }
    console.log(site);
    if (site.length) {
      chrome.tabs.sendMessage(tabId, { site });
    }
  }
});
