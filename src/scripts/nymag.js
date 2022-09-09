import { getNode, removeBasicPaywall, initMutationObserver } from './helpers';

export default function nymag() {
  const root = getNode('html');
  const paywall = getNode('#cliff-takeover');
  addParagraphsBack();
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

function addParagraphsBack() {
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationList, observer) => {
    const articleNode = getNode('.article-content');
    for (const mutation of mutationList) {
      const { removedNodes, nextSibling, target: parentNode } = mutation;
      if (removedNodes.length && parentNode === articleNode) {
        parentNode.insertBefore(removedNodes[0], nextSibling);
      }
    }
    observer.disconnect();
  });

  observer.observe(document.body, config);
}
