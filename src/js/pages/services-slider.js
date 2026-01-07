/**
 * Навигация для слайдера услуг
 */
export function initServicesSlider() {
  const wrapper = document.querySelector('.services-catalog__grid');
  const prevBtns = document.querySelectorAll('.services-catalog__nav-btn--prev');
  const nextBtns = document.querySelectorAll('.services-catalog__nav-btn--next');

  if (!wrapper || prevBtns.length === 0 || nextBtns.length === 0) {
    console.log('Services slider elements not found, skipping initialization.');
    return;
  }

  console.log('Initializing services slider.');

  function getCardWidth() {
    const card = wrapper.querySelector('.service-card');
    if (!card) return 0;
    const style = getComputedStyle(wrapper);
    const gap = parseInt(style.gap) || 40;
    return card.offsetWidth + gap;
  }

  function scrollToNext() {
    const cardWidth = getCardWidth();
    wrapper.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollToPrev() {
    const cardWidth = getCardWidth();
    wrapper.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  }

  // Привязываем обработчики ко всем кнопкам (desktop и mobile)
  nextBtns.forEach(btn => btn.addEventListener('click', scrollToNext));
  prevBtns.forEach(btn => btn.addEventListener('click', scrollToPrev));

  // Drag scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.style.cursor = 'grabbing';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  wrapper.style.cursor = 'grab';
}

