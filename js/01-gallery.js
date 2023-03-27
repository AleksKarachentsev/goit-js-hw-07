import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
      </a>
      </div>`
  )
  .join('');

const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: modalWindow => {
        window.addEventListener('keydown', onEscapePress);
      },
      onClose: modalWindow => {
        window.removeEventListener('keydown', onEscapePress);
      },
    }
  );
  instance.show();

  function onEscapePress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
      instance.close();
    }
  }
}
