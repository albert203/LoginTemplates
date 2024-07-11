document.addEventListener('DOMContentLoaded', () => {
  const nextBtns = document.querySelectorAll('.next');
  const previousBtns = document.querySelectorAll('.previous');
  const currentForm = document.querySelector('.registerForm');
  const previousForm = document.querySelector('.personalDetailsForm');

  let currentFormIndex = 1;

  nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const currentForm = document.querySelector(`.form-${index + 1}`);
      const previousForm = document.querySelector(`.form-${index - 1}`);
    });
  });

  document.querySelectorAll('.next').addEventListener('click', () => {
    if (
      document
        .querySelector('.personalDetailsForm')
        .classList.contains('hidden')
    ) {
      document.querySelector('.registerForm').classList.add('hidden');
      document.querySelector('.personalDetails').classList.remove('hidden');
    } else if (
      document
        .querySelector('.personalDetailsForm')
        .classList.contains('hidden')
    ) {
      document.querySelector('.personalDetails').classList.add('hidden');
      document.querySelector('.registerForm').classList.remove('hidden');
    }
    const currentForm = document.querySelector('.registerForm');
    const previousForm = document.querySelector('.personalDetailsForm');

    currentForm.classList.add('hidden');
  });
});
