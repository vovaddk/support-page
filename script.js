document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".currency-button");
  const detailsContainers = document.querySelectorAll(".details-container");
  const copyButtons = document.querySelectorAll(".copy-button");
  const copyAllButtons = document.querySelectorAll(".copy-all-button");

  // Реалізація перемикання між деталями при натисканні на кнопки валют
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Знімаємо активний клас з усіх кнопок
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Додаємо активний клас до натиснутої кнопки
      button.classList.add("active");

      // Приховуємо всі блоки з деталями
      detailsContainers.forEach((detail) => (detail.style.display = "none"));

      // Відображаємо відповідний блок з деталями
      if (detailsContainers[index]) {
        detailsContainers[index].style.display = "block";
      }
    });
  });

  // Початкове відображення першого блоку з деталями
  detailsContainers.forEach((detail, index) => {
    if (index !== 0) {
      detail.style.display = "none";
    }
  });

  // Реалізація функції копіювання для кожного окремого поля
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const valueToCopy = button.previousElementSibling.textContent;
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          showToast("Поле успішно скопіювано");
        })
        .catch((err) => {
          console.error("Помилка копіювання: ", err);
          showToast("Помилка копіювання");
        });
    });
  });

  // Реалізація функції копіювання всіх полів
  copyAllButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const detailsContainer = button.closest(".details-container");
      const allValues = detailsContainer.querySelectorAll(".detail-value");
      let textToCopy = "";
      allValues.forEach((value) => {
        textToCopy += value.textContent + "\n";
      });
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          showToast("Всі поля скопійовано");
        })
        .catch((err) => {
          console.error("Помилка копіювання: ", err);
          showToast("Помилка копіювання");
        });
    });
  });

  // Функція для відображення повідомлення знизу
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
});

// Додаємо CSS для toast-повідомлення
const style = document.createElement("style");
style.textContent = `
 .toast-message {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #4CAF50;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
  }
  .toast-message.show {
    visibility: visible;
    opacity: 1;
  }
`;
document.head.appendChild(style);
