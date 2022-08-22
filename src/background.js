chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete' && tabInfo.url) {
    const url = tabInfo.url;
    let site = '';
    if (url.includes('nytimes')) {
      site = 'nytimes';
    } else if (url.includes('nymag') || url.includes('vulture')) {
      site = 'nymag';
    }

    if (site.length) {
      chrome.tabs.sendMessage(tabId, { site });
    }
  }
});
