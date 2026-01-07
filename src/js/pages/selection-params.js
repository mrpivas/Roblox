/**
 * Обработка параметров на странице подбора услуги
 */
export function initSelectionParams() {
  const paramButtons = document.querySelectorAll('.selection__param-btn');
  const resultButton = document.querySelector('.selection__result-btn');
  
  if (!paramButtons.length) return;

  // Объект для хранения выбранных параметров
  const selectedParams = {};

  paramButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Получаем группу параметров (section1, section2 и т.д.)
      const paramGroup = button.getAttribute('data-param');
      const paramValue = button.getAttribute('data-value');
      
      // Находим все кнопки в той же группе
      const groupButtons = document.querySelectorAll(
        `.selection__param-btn[data-param="${paramGroup}"]`
      );
      
      // Убираем активный класс со всех кнопок в группе
      groupButtons.forEach((btn) => {
        btn.classList.remove('active');
      });
      
      // Добавляем активный класс к текущей кнопке
      button.classList.add('active');
      
      // Сохраняем выбранное значение
      selectedParams[paramGroup] = paramValue;
    });
  });

  // Обработчик для кнопки результата
  if (resultButton) {
    resultButton.addEventListener('click', () => {
      // Определяем услугу на основе выбранных параметров
      const serviceInfo = determineService(selectedParams);
      
      // Обновляем модалку с информацией об услуге
      updateResultModal(serviceInfo);
    });
  }
}

/**
 * Определяет услугу на основе выбранных параметров
 */
function determineService(params) {
  // Здесь можно добавить логику определения услуги
  // на основе комбинации параметров
  return {
    title: 'Рекомендуемая услуга',
    description: 'На основе ваших ответов мы рекомендуем эту услугу. Она идеально подходит для ваших задач и поможет достичь поставленных целей.',
  };
}

/**
 * Обновляет содержимое модального окна с результатом
 */
function updateResultModal(serviceInfo) {
  const titleElement = document.getElementById('selectionResultTitle');
  const descriptionElement = document.getElementById('selectionResultDescription');
  
  if (titleElement) {
    titleElement.textContent = serviceInfo.title;
  }
  
  if (descriptionElement) {
    descriptionElement.textContent = serviceInfo.description;
  }
}

