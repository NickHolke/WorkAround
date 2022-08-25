import { getNode, removeBasicPaywall, initMutationObserver } from './helpers';

export default function nymag() {
  const root = getNode('html');
  const paywall = getNode('#cliff-takeover');

  if (root.hasAttribute('style') && paywall) {
    removeBasicPaywall(paywall, document.body, root);
  } else {
    const config = { attributes: true, attributeFilter: ['style'] };
    initMutationObserver(root, config, nymMutationCallback);
  }
}

function nymMutationCallback(mutationList, observer) {
  for (const mutation of mutationList) {
    const paywall = getNode('#cliff-takeover');
    if (paywall) {
      removeBasicPaywall(paywall, document.body, mutation.target);
      observer.disconnect();
    }
  }
}
