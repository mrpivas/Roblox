/**
 * 3D слайдер с эффектом coverflow
 */

import Swiper from "swiper/bundle";

export function init3DSlider() {
  const swiperContainer = document.querySelector(".hero-swiper");
  if (!swiperContainer) {
    return;
  }

  const heroSwiper = new Swiper(".hero-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 600,
    loop: true,
    direction: "horizontal", // Явно указываем горизонтальное направление
    watchSlidesProgress: true, // ВАЖНО: для правильной работы progress в loop

    // Поддержка тачпада и жестов
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: false,
    },

    coverflowEffect: {
      rotate: 0, // Убираем поворот по Y
      stretch: 60,
      depth: 200,
      modifier: 1.2,
      slideShadows: false,
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: true, // Движение вправо (карточки справа становятся центральными)
    },

    keyboard: {
      enabled: true,
    },

    // Жёстко ограничиваем видимые слайды по нормализованному progress
    // Показываем 6 карточек: 3 слева, центральная, 3 справа
    on: {
      setTranslate: function() {
        const swiper = this;
        const slides = swiper.slides;

        slides.forEach((slide) => {
          // Округляем progress до целого для симметрии
          const p = Math.round(slide.progress);

          let rotateZ = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;

          // Центральная
          if (p === 0) {
            rotateZ = 0;
            scale = 1;
            zIndex = 40;
          }
          // Первая слева
          else if (p === -1) {
            rotateZ = 6;
            scale = 0.95;
            zIndex = 30;
          }
          // Первая справа
          else if (p === 1) {
            rotateZ = -6;
            scale = 0.95;
            zIndex = 30;
          }
          // Вторая слева
          else if (p === -2) {
            rotateZ = 4;
            scale = 0.9;
            zIndex = 20;
          }
          // Вторая справа
          else if (p === 2) {
            rotateZ = -4;
            scale = 0.9;
            zIndex = 20;
          }
          // Третья слева
          else if (p === -3) {
            rotateZ = 2;
            scale = 0.85;
            zIndex = 10;
          }
          // Третья справа
          else if (p === 3) {
            rotateZ = -2;
            scale = 0.85;
            zIndex = 10;
          }
          // ВСЁ ОСТАЛЬНОЕ — СКРЫВАЕМ
          else {
            opacity = 0;
            scale = 0.8;
            zIndex = 1;
          }

          slide.style.opacity = opacity;
          slide.style.zIndex = zIndex;

          // Удаляем старые rotateZ и scale, добавляем новые
          slide.style.transform =
            slide.style.transform
              .replace(/rotateZ\(.*?\)/g, "")
              .replace(/scale\(.*?\)/g, "") +
            ` rotateZ(${rotateZ}deg) scale(${scale})`;
        });
      },
    },

    breakpoints: {
      320: {
        coverflowEffect: {
          rotate: 0,
          stretch: 40,
          depth: 150,
          modifier: 1,
        },
      },
      768: {
        coverflowEffect: {
          rotate: 0,
          stretch: 50,
          depth: 180,
          modifier: 1.1,
        },
      },
      1024: {
        coverflowEffect: {
          rotate: 0,
          stretch: 60,
          depth: 200,
          modifier: 1.2,
        },
      },
    },
  });

  return heroSwiper;
}
