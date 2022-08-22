import paywallFunctions from './scripts/paywallFunctions';

(() => {
  chrome.runtime.onMessage.addListener(request => {
    const removePaywall = paywallFunctions[request.site];
    removePaywall();
  });
})();
