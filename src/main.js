import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const data = form.elements;
  const searchQuery = data['search-text'].value.trim();

  clearGallery();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  showLoader();

  try {
    const images = await getImagesByQuery(searchQuery);

    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found.',
      });
      return;
    }

    createGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images.',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});
