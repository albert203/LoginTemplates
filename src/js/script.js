document.addEventListener("DOMContentLoaded", () => {
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const steps = document.querySelectorAll(".step");
  const forms = document.querySelectorAll(".form");
  const progressBar = document.querySelector(".progress-bar");
  const totalSteps = steps.length;

  // Set the initial width of the progress bar
  updateStep(0);

  // Add click event to each next button so when user clicks on it,
  // it will show the next form
  nextBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const currentForm = document.querySelector(`.form-${index}`);
      const nextForm = document.querySelector(`.form-${index + 1}`);

      if (nextForm) {
        currentForm.classList.remove("active");
        nextForm.classList.add("active");
        updateStep(index + 1);
      }
    });
  });

  // Add click event to each prev button so when user clicks on it,
  // it will show the previous form
  prevBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const currentForm = document.querySelector(`.form-${index + 1}`);
      const prevForm = document.querySelector(`.form-${index}`);

      if (prevForm) {
        currentForm.classList.remove("active");
        prevForm.classList.add("active");
        updateStep(index);
      }
    });
  });

  // Add click event to each step so if user clicks on it, it will show the form
  // and update the progress bar
  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      forms.forEach((form, formIndex) => {
        if (formIndex === index) {
          form.classList.add("active");
        } else {
          form.classList.remove("active");
        }
      });
      updateStep(index);
    });
  });

  // Function to update the progress bar and the active step
  function updateStep(index) {
    document.querySelector(".step.active").classList.remove("active");
    steps[index].classList.add("active");
    progressBar.style.width = `${((index + 1) / totalSteps) * 100}%`;
  }
});
