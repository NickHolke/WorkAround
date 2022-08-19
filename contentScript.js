(() => {
  chrome.runtime.onMessage.addListener(request => {
    const fn = paywallFunctions[request.site];
    if (
      document.readyState === 'complete' ||
      document.readyState === 'loaded'
    ) {
      fn();
    } else {
      window.addEventListener('DOMContentLoaded', fn);
    }
  });
})();

const paywallFunctions = {
  nytimes: () => {
    const paywall = document.querySelector('#gateway-content');

    if (paywall) {
      removeNytPaywall(paywall);
    } else {
      const root = document.querySelector('#app');
      const config = { childList: true, subtree: true };
      const observer = new MutationObserver(nytMutationCallback);
      observer.observe(root, config);
    }

    function removeNytPaywall(paywall) {
      paywall.style.display = 'none';
      const overlay = document.querySelector('#app > div > div:first-child');
      overlay.style.position = 'static';
      overlay.querySelector(':scope > div:last-child').style.display = 'none';
    }

    function nytMutationCallback(mutationList, observer) {
      for (const mutation of mutationList) {
        mutation.addedNodes.forEach(node => {
          if (node.id === 'gateway-content') {
            removeNytPaywall(node);
            observer.disconnect();
          }
        });
      }
    }
  }
};
