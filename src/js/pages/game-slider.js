/**
 * Навигация для слайдера на странице игры + drag-scroll
 */
export function initGameSlider() {
  const prevBtn = document.querySelector('.game-about__nav--prev');
  const nextBtn = document.querySelector('.game-about__nav--next');
  const track = document.querySelector('.game-about__slider-track');
  const slider = document.querySelector('.game-about__slider');

  if (!prevBtn || !nextBtn || !track || !slider) {
    console.log('Game slider elements not found, skipping initialization.');
    return;
  }

  console.log('Initializing game slider navigation and drag-scroll.');

  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // Функция для паузы анимации
  function pauseAnimation() {
    track.style.animationPlayState = 'paused';
    isPaused = true;
  }

  // Функция для возобновления анимации
  function resumeAnimation() {
    if (!isDragging) {
      track.style.animationPlayState = 'running';
      isPaused = false;
    }
  }

  // Остановка при наведении мыши
  slider.addEventListener('mouseenter', () => {
    pauseAnimation();
  });

  slider.addEventListener('mouseleave', () => {
    if (!isDragging) {
      resumeAnimation();
    }
  });

  // Клик на "Предыдущий"
  prevBtn.addEventListener('click', () => {
    pauseAnimation();
    const currentTransform = getComputedStyle(track).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentX = matrix.m41;
    
    // Сдвигаем вправо на ширину одного слайда
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX + 620}px)`;
    
    setTimeout(() => {
      track.style.animation = '';
      resumeAnimation();
    }, 500);
  });

  // Клик на "Следующий"
  nextBtn.addEventListener('click', () => {
    pauseAnimation();
    const currentTransform = getComputedStyle(track).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentX = matrix.m41;
    
    // Сдвигаем влево на ширину одного слайда
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX - 620}px)`;
    
    setTimeout(() => {
      track.style.animation = '';
      resumeAnimation();
    }, 500);
  });

  // Drag-scroll функционал
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    pauseAnimation();
    startX = e.pageX;
    
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
    isDragging = false;
    setTimeout(() => {
      track.style.animation = '';
      resumeAnimation();
    }, 500);
  });

  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      setTimeout(() => {
        track.style.animation = '';
        resumeAnimation();
      }, 500);
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
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 2;
    
    track.style.animation = 'none';
    track.style.transform = `translateX(${touchScrollLeft + walk}px)`;
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
    setTimeout(() => {
      track.style.animation = '';
      resumeAnimation();
    }, 500);
  });
}

// Инициализация после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGameSlider, 0);
  });
} else {
  setTimeout(initGameSlider, 0);
}

