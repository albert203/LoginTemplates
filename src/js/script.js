document.addEventListener('DOMContentLoaded', () => {
  const nextBtns = document.querySelectorAll('.next-btn');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const steps = document.querySelectorAll('.step');
  const forms = document.querySelectorAll('.form');
  const progressBar = document.querySelector('.progress-bar-fill');
  const totalSteps = steps.length;

  // Set the initial width of the progress bar
  updateStep(0);

  // Add click event to each next button
  nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const currentForm = document.querySelector(`.form-${index}`);
      const nextForm = document.querySelector(`.form-${index + 1}`);

      if (nextForm) {
        currentForm.classList.remove('active');
        currentForm.classList.add('hidden');
        nextForm.classList.remove('hidden');
        nextForm.classList.add('active');
        updateStep(index + 1);
      }
    });
  });

  // Add click event to each previous button
  prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const currentForm = document.querySelector(`.form-${index + 1}`);
      const prevForm = document.querySelector(`.form-${index}`);

      if (prevForm) {
        currentForm.classList.remove('active');
        currentForm.classList.add('hidden');
        prevForm.classList.remove('hidden');
        prevForm.classList.add('active');
        updateStep(index);
      }
    });
  });

  // Add click event to each step
  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      forms.forEach((form, formIndex) => {
        if (formIndex === index) {
          form.classList.add('active');
          form.classList.remove('hidden');
        } else {
          form.classList.remove('active');
          form.classList.add('hidden');
        }
      });
      updateStep(index);
    });
  });

  // Function to update the progress bar and the active step
  function updateStep(index) {
    // Update active step
    document.querySelector('.step.active').classList.remove('active');
    steps[index].classList.add('active');

    // Update progress bar animation
    const progressWidth = ((index + 1) / totalSteps) * 100;
    progressBar.style.width = `${progressWidth}%`;
    progressBar.style.transition = 'width 0.5s ease'; // Smooth transition
  }
});
