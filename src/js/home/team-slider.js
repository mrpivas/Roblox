import Swiper from 'swiper/bundle';

export function initTeamSlider() {
  // Проверяем наличие слайдера перед инициализацией
  const swiperContainer = document.querySelector('.team-swiper');
  if (!swiperContainer) return;

  const prevBtns = document.querySelectorAll('.team__nav-btn--prev');
  const nextBtns = document.querySelectorAll('.team__nav-btn--next');

  // Функция обновления иконок навигации
  const updateNavigationIcons = () => {
    // Обновляем все кнопки prev
    prevBtns.forEach(btn => {
      const img = btn.querySelector('img');
      if (img) {
        img.src = './img/svgicons/all/arrow-active.svg';
      }
      btn.style.opacity = btn.classList.contains('swiper-button-disabled') ? '0.4' : '1';
    });

    // Обновляем все кнопки next
    nextBtns.forEach(btn => {
      const img = btn.querySelector('img');
      if (img) {
        img.src = './img/svgicons/all/arrow-active.svg';
      }
      btn.style.opacity = btn.classList.contains('swiper-button-disabled') ? '0.4' : '1';
    });
  };

  const teamSwiper = new Swiper('.team-swiper', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 13,
    loop: false,
    speed: 600,
    
    navigation: {
      nextEl: '.team__nav-btn--next',
      prevEl: '.team__nav-btn--prev',
      disabledClass: 'swiper-button-disabled',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 13,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 13,
      },
    },

    // Обновляем иконки при изменении слайда
    on: {
      init: function() {
        updateNavigationIcons();
      },
      slideChange: function() {
        updateNavigationIcons();
      },
      navigationNext: function() {
        updateNavigationIcons();
      },
      navigationPrev: function() {
        updateNavigationIcons();
      },
    },
  });

  // Flip-эффект для карточек - используем делегирование событий
  document.addEventListener('click', (e) => {
    const toggleButton = e.target.closest('.team-card__toggle');
    
    if (toggleButton) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = toggleButton.closest('.team-card');
      if (card) {
        card.classList.toggle('is-flipped');
      }
    }
  });
}

