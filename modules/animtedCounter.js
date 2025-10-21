const studentNumbers = document.querySelector(".nums-student");
const teachersNumbers = document.querySelector(".nums-teachers");
const existenceNumbers = document.querySelector(".nums-existence");
const partnersNumbers = document.querySelector(".nums-partners");
const whyChooseusEl = document.querySelector(".why-choose-us");
// observing the animated number and calling it when it's intersecting with the view-port
export function animatedCount() {
  const counterAnimation = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    animateCounter(studentNumbers, 10000);
    animateCounter(teachersNumbers, 700);
    animateCounter(partnersNumbers, 150);
    animateCounter(existenceNumbers, 24);
    observer.unobserve(entry.target);
  };
  const observeAnimatedText = new IntersectionObserver(counterAnimation, {
    root: null,
    threshold: 1,
  });
  observeAnimatedText.observe(studentNumbers);
  observeAnimatedText.observe(teachersNumbers);
  observeAnimatedText.observe(existenceNumbers);
  observeAnimatedText.observe(partnersNumbers);
}
//  animated counter effect
function animateCounter(element, target, duration = 5000) {
  let startTime = null;
  const startValue = 0;
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4); // for smoth easing of function
  function step(timeStamp) {
    if (!startTime) startTime = timeStamp;
    const progress = Math.min((timeStamp - startTime) / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.floor(easedProgress * target);

    element.textContent = currentValue.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  window.requestAnimationFrame(step);
}
