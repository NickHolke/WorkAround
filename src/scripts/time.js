export default function time() {
  const paywall = document.querySelector('.registration-wall');
  if (paywall) {
    removeTimePaywall(paywall);
  }
}

function removeTimePaywall(paywall) {
  paywall.style.display = 'none';
  const body = document.body;
  const styles = {
    position: 'static',
    overflowY: 'auto'
  };
  Object.assign(body.style, styles);
}
