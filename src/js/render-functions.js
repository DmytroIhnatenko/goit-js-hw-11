import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function createGallery(images) {
  const gallery = document.createElement('ul');
  gallery.className = 'gallery';

  images.forEach(image => {
    const listItem = document.createElement('li');
    listItem.className = 'gallery-item';

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.target = '_blank';

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'image-info';

    const likes = document.createElement('span');
    likes.className = 'likes';
    likes.textContent = `Likes: ${image.likes}`;

    const views = document.createElement('span');
    views.className = 'views';
    views.textContent = `Views: ${image.views}`;

    const comments = document.createElement('span');
    comments.className = 'comments';
    comments.textContent = `Comments: ${image.comments}`;

    const downloads = document.createElement('span');
    downloads.className = 'downloads';
    downloads.textContent = `Downloads: ${image.downloads}`;

    infoContainer.appendChild(likes);
    infoContainer.appendChild(views);
    infoContainer.appendChild(comments);
    infoContainer.appendChild(downloads);

    link.appendChild(img);
    listItem.appendChild(link);
    listItem.appendChild(infoContainer);
    gallery.appendChild(listItem);
  });

  const galleryContainer = document.querySelector('.pages_container');
  galleryContainer.appendChild(gallery);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

function clearGallery() {
  const galleryContainer = document.querySelector('.pages_container');
  const existingGallery = galleryContainer.querySelector('.gallery');

  if (existingGallery) {
    galleryContainer.removeChild(existingGallery);
  }
}

function showLoader() {
  iziToast.show({
    title: 'Loading...',
    message: 'Fetching images from Pixabay...',
    position: 'topCenter',
    icon: 'fa fa-spinner fa-spin',
    timeout: 5000,
    zindex: 9999,
  });
}
function hideLoader() {
  iziToast.hide();
}

export { createGallery, clearGallery, showLoader, hideLoader };
