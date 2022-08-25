import { getNode, removeBasicPaywall } from './helpers';

export default function time() {
  const paywall = getNode('.registration-wall');
  if (paywall) {
    removeBasicPaywall(paywall, document.body, document.body);
  }
}
