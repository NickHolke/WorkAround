(() => {
  chrome.runtime.onMessage.addListener(request => {
    if (
      document.readyState === 'complete' ||
      document.readyState === 'loaded'
    ) {
      nytimesPaywall();
    } else {
      window.addEventListener('DOMContentLoaded', nytimesPaywall);
    }
  });
})();

// Add a mutation observer on #root to watch for slower loading paywall

function nytimesPaywall() {
  const paywall = document.querySelector('#gateway-content');

  if (paywall) {
    removePaywall(paywall);
  } else {
    const root = document.querySelector('#app');
    const mutationCallback = mutationList => {
      for (const mutation of mutationList) {
        mutation.addedNodes.forEach(node => {
          if (node.id === 'gateway-content') {
            removePaywall(node);
            observer.disconnect();
          }
        });
      }
    };
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(mutationCallback);
    observer.observe(root, config);
  }
}

function removePaywall(paywall) {
  paywall.style.display = 'none';
  const overlay = document.querySelector('#app > div > div:first-child');
  overlay.style.position = 'static';
  overlay.querySelector(':scope > div:last-child').style.display = 'none';
}
