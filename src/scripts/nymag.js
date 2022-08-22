export default function nymag() {
  const root = document.querySelector('html');
  const paywall = document.querySelector('#cliff-takeover');
  if (root.hasAttribute('style') && paywall) {
    removeNymPaywall(paywall, root);
  } else {
    const config = { attributes: true, attributeFilter: ['style'] };
    const observer = new MutationObserver(nymMutationCallback);
    observer.observe(root, config);
  }
}

function nymMutationCallback(mutationList, observer) {
  for (const mutation of mutationList) {
    const paywall = document.querySelector('#cliff-takeover');
    if (paywall) {
      removeNymPaywall(paywall, mutation.target);
      observer.disconnect();
    }
  }
}

function removeNymPaywall(paywall, root) {
  paywall.style.display = 'none';
  root.style.overflowY = 'auto';
  document.body.style.position = 'static';
}
