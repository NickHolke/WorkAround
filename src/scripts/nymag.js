import { getNode, removeBasicPaywall, initMutationObserver } from './helpers';

export default function nymag() {
  // const root = getNode('html');
  // const paywall = getNode('#cliff-takeover');
  // if (root.hasAttribute('style') && paywall) {
  //   removeBasicPaywall(paywall, document.body, root);
  // } else {
  //   const config = { attributes: true, attributeFilter: ['style'] };
  //   initMutationObserver(root, config, nymMutationCallback);
  // }
  const articleNode = getNode('.article-content');
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      const { removedNodes, nextSibling, target: parentNode } = mutation;
      if (mutation.removedNodes.length) {
        parentNode.insertBefore(removedNodes[0], nextSibling);
      }
    }
  });

  observer.observe(document.body, config);
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
