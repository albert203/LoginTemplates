document.addEventListener("DOMContentLoaded", () => {
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const steps = document.querySelectorAll(".step");
  const forms = document.querySelectorAll(".form");
  const progressBarFill = document.querySelector(".progress-bar-fill");
  const totalSteps = steps.length;

  function updateStep(step) {
    steps.forEach((stepEl, index) => {
      if (index <= step) {
        stepEl.classList.add("bg-indigo-600", "text-white");
        stepEl.classList.remove("bg-gray-300", "text-gray-600");
      } else {
        stepEl.classList.add("bg-gray-300", "text-gray-600");
        stepEl.classList.remove("bg-indigo-600", "text-white");
      }
    });

    const progressWidth = (step / (totalSteps - 1)) * 100;
    progressBarFill.style.width = `${progressWidth}%`;
  }

  updateStep(0);

  nextBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const currentForm = document.querySelector(`.form-${index}`);
      const nextForm = document.querySelector(`.form-${index + 1}`);

      if (nextForm) {
        currentForm.classList.remove("active");
        currentForm.classList.add("hidden");
        nextForm.classList.remove("hidden");
        nextForm.classList.add("active");
        updateStep(index + 1);
      }
    });
  });

  prevBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const currentForm = document.querySelector(`.form-${index + 1}`);
      const prevForm = document.querySelector(`.form-${index}`);

      if (prevForm) {
        currentForm.classList.remove("active");
        currentForm.classList.add("hidden");
        prevForm.classList.remove("hidden");
        prevForm.classList.add("active");
        updateStep(index);
      }
    });
  });

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      forms.forEach((form, formIndex) => {
        if (formIndex === index) {
          form.classList.add("active");
          form.classList.remove("hidden");
        } else {
          form.classList.remove("active");
          form.classList.add("hidden");
        }
      });
      updateStep(index);
    });
  });
});
