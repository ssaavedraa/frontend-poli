import { LocalStorageService } from '../../services/local-storage.service.js';

const formElement = document.getElementById('contact-form');

if (!formElement) {
  throw new Error('Form element not found');
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  const name = formData.get('name').trim()
  const email = formData.get('email').trim()
  const message = formData.get('message').trim()

  sendData({
    name,
    email,
    message,
  })
})

function sendData(payload) {
  LocalStorageService.set('contact-data', payload);

  showSuccessMessage();
}

function showSuccessMessage() {
  const successMessageElement = document.getElementById('contact-success-message');
  if (!successMessageElement) {
    throw new Error('Success message element not found');
  }
  successMessageElement.classList.remove('contact__success-message--hidden');

  setTimeout(() => {
    successMessageElement.classList.add('contact__success-message--hidden');
  }, 3000);

  formElement.reset();
}