import {
  getNode,
  setPositionStatic,
  setDisplayNone,
  setOverflowyAuto
} from './helpers';

export default function time() {
  const paywall = getNode('.registration-wall');
  if (paywall) {
    removeTimePaywall(paywall);
  }
}

function removeTimePaywall(paywall) {
  setDisplayNone(paywall);
  setPositionStatic(document.body);
  setOverflowyAuto(document.body);
}
