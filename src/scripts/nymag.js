import {
  getNode,
  setPositionStatic,
  setDisplayNone,
  setOverflowyAuto,
  initMutationObserver
} from './helpers';

export default function nymag() {
  const root = getNode('html');
  const paywall = getNode('#cliff-takeover');

  if (root.hasAttribute('style') && paywall) {
    removeNymPaywall(paywall, root);
  } else {
    const config = { attributes: true, attributeFilter: ['style'] };
    initMutationObserver(root, config, nymMutationCallback);
  }
}

function nymMutationCallback(mutationList, observer) {
  for (const mutation of mutationList) {
    const paywall = getNode('#cliff-takeover');
    if (paywall) {
      removeNymPaywall(paywall, mutation.target);
      observer.disconnect();
    }
  }
}

function removeNymPaywall(paywall, root) {
  setDisplayNone(paywall);
  setOverflowyAuto(root);
  setPositionStatic(document.body);
}
