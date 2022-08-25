export function setDisplayNone(node) {
  node.style.display = 'none';
}

export function setPositionStatic(node) {
  node.style.position = 'static';
}

export function setOverflowyAuto(node) {
  node.style.overflowY = 'auto';
}

export function getNode(selector) {
  return document.querySelector(selector);
}

export function initMutationObserver(root, config, cb) {
  const observer = new MutationObserver(cb);
  observer.observe(root, config);
}

export function removeBasicPaywall(paywall, positionNode, overflowNode) {
  setDisplayNone(paywall);
  setPositionStatic(positionNode);
  setOverflowyAuto(overflowNode);
}
