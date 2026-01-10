/**
 * Drag-scroll для слайдера service-games
 */
export function initServiceGamesSlider() {
  const slider = document.querySelector('.service-games__slider');
  const track = document.querySelector('.service-games__slider-track');

  if (!slider || !track) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // Функция для паузы анимации
  function pauseAnimation() {
    track.style.animationPlayState = 'paused';
  }

  // Функция для возобновления анимации
  function resumeAnimation() {
    if (!isDragging) {
      track.style.animationPlayState = 'running';
    }
  }

  // Остановка при наведении
  slider.addEventListener('mouseenter', () => {
    pauseAnimation();
  });

  slider.addEventListener('mouseleave', () => {
    if (!isDragging) {
      resumeAnimation();
    }
  });

  // Drag-scroll функционал
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    pauseAnimation();
    startX = e.pageX;
    slider.style.cursor = 'grabbing';
    
    const currentTransform = getComputedStyle(track).transform;
    const matrix = new DOMMatrix(currentTransform);
    scrollLeft = matrix.m41;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (x - startX) * 2; // Скорость перетаскивания
    
    track.style.animation = 'none';
    track.style.transform = `translateX(${scrollLeft + walk}px)`;
  });

  slider.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      slider.style.cursor = 'grab';
      // Не возобновляем анимацию автоматически после drag
    }
  });

  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slider.style.cursor = 'grab';
    }
  });

  // Touch events для мобильных
  let touchStartX = 0;
  let touchScrollLeft = 0;

  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    pauseAnimation();
    touchStartX = e.touches[0].pageX;
    
    const currentTransform = getComputedStyle(track).transform;
    const matrix = new DOMMatrix(currentTransform);
    touchScrollLeft = matrix.m41;
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 2;
    
    track.style.animation = 'none';
    track.style.transform = `translateX(${touchScrollLeft + walk}px)`;
  }, { passive: false });

  slider.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Инициализация после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initServiceGamesSlider, 0);
  });
} else {
  setTimeout(initServiceGamesSlider, 0);
}