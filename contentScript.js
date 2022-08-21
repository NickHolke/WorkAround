(() => {
  chrome.runtime.onMessage.addListener(request => {
    const removePaywall = paywallFunctions[request.site];
    // window.addEventListener('DOMContentLoaded', removePaywall);
    if (
      document.readyState === 'complete' ||
      document.readyState === 'loaded'
    ) {
      removePaywall();
    } else {
      window.addEventListener('DOMContentLoaded', removePaywall);
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
  },
  nymag: () => {
    const root = document.querySelector('html');
    const paywall = document.querySelector('#cliff-takeover');
    if (root.hasAttribute('style') && paywall) {
      removeNymPaywall(paywall);
    } else {
      const config = { attributes: true, attributeFilter: ['style'] };
      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          const paywall = document.querySelector('#cliff-takeover');
          if (paywall) {
            removeNymPaywall(paywall);
          }
          observer.disconnect();
        }
      });
      observer.observe(root, config);
    }

    function removeNymPaywall(paywall) {
      paywall.style.display = 'none';
      root.style.overflowY = 'auto';
      document.querySelector('body').style.position = 'static';
    }
  }
};
