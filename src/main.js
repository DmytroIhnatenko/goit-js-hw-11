import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const submitButton = document.querySelector('.btn_form');

submitButton.addEventListener('click', async event => {
  event.preventDefault();

  const data = submitButton.form.elements;

  const searchQuery = data['search-text'].value;

  console.log('Search Query:', searchQuery);

  showLoader();
  if (searchQuery.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  try {
    const images = await getImagesByQuery(searchQuery);

    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found.',
      });
      return;
    }

    clearGallery();
    createGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images.',
    });
  } finally {
    hideLoader();
    submitButton.form.reset();
  }
});
