
var galleries = document.querySelectorAll('.gallery');

var gallery = function (gallery_elem) {

    var galleryItems = gallery_elem.querySelectorAll('.gallery__item');
    var buttonPrev = gallery_elem.querySelector('.gallery__button--prev');
    var buttonNext = gallery_elem.querySelector('.gallery__button--next');
    var currentItem = 0;

    galleryItems[currentItem].classList.add('gallery__item--current');

    buttonNext.addEventListener('click', function (evt) {
        evt.preventDefault();
        galleryItems[currentItem].classList.remove('gallery__item--current');
        currentItem += 1;

        if (currentItem === galleryItems.length) {
            currentItem = galleryItems.length - 1;
        }

        galleryItems[currentItem].classList.add('gallery__item--current');

    });

    buttonPrev.addEventListener('click', function (evt) {
        evt.preventDefault();
        galleryItems[currentItem].classList.remove('gallery__item--current');
        currentItem -= 1;

        if (currentItem === -1) {
            currentItem = 0;
        }

        galleryItems[currentItem].classList.add('gallery__item--current');
    });
};

for (var i = 0; i < galleries.length; i++) {
    gallery(galleries[i]);
}

var mainMenu = document.querySelector('.nav');
var mainMenuButton = document.querySelector('.nav__button');

mainMenuButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    mainMenu.classList.toggle('nav--open');
});
