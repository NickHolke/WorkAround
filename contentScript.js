(() => {
  chrome.runtime.onMessage.addListener(request => {
    console.log('Message from the background script:');
    console.log(request.type);

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

function nytimesPaywall() {
  const paywall = document.querySelector('#gateway-content');

  if (paywall) {
    paywall.style.display = 'none';
    const overlay = document.querySelector('#app > div > div:first-child');
    overlay.style.position = 'static';
    overlay.querySelector(':scope > div:last-child').style.display = 'none';
  }
}
