import {
  getNode,
  setPositionStatic,
  setDisplayNone,
  initMutationObserver
} from './helpers';

export default function nytimes() {
  const paywall = getNode('#gateway-content');

  if (paywall) {
    removeNytPaywall(paywall);
  } else {
    const root = getNode('#app');
    const config = { childList: true, subtree: true };
    initMutationObserver(root, config, nytMutationCallback);
  }
}

function removeNytPaywall(paywall) {
  const overlay = getNode('#app > div > div:first-child');
  const secondOverlay = overlay.querySelector(':scope > div:last-child');
  setDisplayNone(paywall);
  setPositionStatic(overlay);
  setDisplayNone(secondOverlay);
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
