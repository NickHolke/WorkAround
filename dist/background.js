chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status === 'complete' && tabInfo.url) {
    const url = tabInfo.url;
    let site = '';
    if (url.includes('www.nytimes')) {
      site = 'nytimes';
    } else if (url.includes('//nymag') || url.includes('www.vulture')) {
      site = 'nymag';
    } else if (url.includes('//time')) {
      site = 'time';
    }

    if (site.length) {
      chrome.tabs.sendMessage(tabId, { site });
    }
  }
});
