const cartPopup = function() {
  const cartPopup = document.querySelector(".cart-popup");

  if(!cartPopup) {
    return;
  }

const cartLink = document.querySelectorAll(".button-buy");
const cartClose = cartPopup.querySelector(".button-close");

for(let button of cartLink) {
  button.addEventListener("click",function(evt) {
    evt.preventDefault();
    cartPopup.classList.add("modal-show");
  });
};

cartClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  cartPopup.classList.remove("modal-show");
  cartPopup.classList.remove("modal-error");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (cartPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      cartPopup.classList.remove("modal-show");
      cartPopup.classList.remove("modal-error");
    }
  }
});
}

const mailPopup = function() {
  const mailPopup = document.querySelector(".form-mail");

  if(!mailPopup) {
    return;
  }

  const mailLink = document.querySelector(".contacts-button");
  const mailClose = mailPopup.querySelector(".button-close");
  const mailForm = mailPopup.querySelector(".mail-form");
  const mailLogin = mailPopup.querySelector(".form-mail-name");
  const mailPassword = mailPopup.querySelector(".form-mail-email");

  let isStorageSupport = true;
  let storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }

  mailLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mailPopup.classList.add("modal-show");

    if (storage) {
      mailLogin.value = storage;
      mailPassword.focus();
    } else {
      mailLogin.focus();
    }
  });

  mailClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mailPopup.classList.remove("modal-show");
    mailPopup.classList.remove("modal-error");
  });

  mailForm.addEventListener("submit", function (evt) {
    if (!mailLogin.value || !mailPassword.value) {
      evt.preventDefault();
      mailPopup.classList.remove("modal-error");
      mailPopup.offsetWidth = mailPopup.offsetWidth;
      mailPopup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("login", mailLogin.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (mailPopup.classList.contains("modal-show")) {
        evt.preventDefault();
        mailPopup.classList.remove("modal-show");
        mailPopup.classList.remove("modal-error");
      }
    }
  });
}

const mapPopup = function() {
  const mapPopup = document.querySelector(".modal-map");

  if(!mapPopup) {
    return;
  }

const mapLink = document.querySelector(".contacts-map");
const mapClose = mapPopup.querySelector(".button-close");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-show");
  mapPopup.classList.remove("modal-error");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      mapPopup.classList.remove("modal-show");
      mapPopup.classList.remove("modal-error");
    }
  }
});
}

cartPopup();
mapPopup();
mailPopup();


const btnRight = document.querySelector(".catalog-slider-next");
const btnLeft = document.querySelector(".catalog-slider-back");
const slides = document.querySelectorAll(".catalog-slider-item");
const sliderDots = document.querySelectorAll(".slider-controls");
let currentSlideIndex = 0;


btnRight.addEventListener("click", function () {
    ++currentSlideIndex
    if (currentSlideIndex >= slides.length) {
        slides[currentSlideIndex-1].classList.remove("slide-current");
        currentSlideIndex = 0;
        slides[currentSlideIndex].classList.add("slide-current");
    } else {
        slides[currentSlideIndex-1].classList.remove("slide-current");
        slides[currentSlideIndex].classList.add("slide-current");
    }
})

btnLeft.addEventListener("click", function () {
  --currentSlideIndex
  if (currentSlideIndex <= slides.length) {
      slides[currentSlideIndex+1].classList.remove("slide-current");
      currentSlideIndex = 0;
      slides[currentSlideIndex].classList.add("slide-current");
  } else {
      slides[currentSlideIndex+1].classList.remove("slide-current");
      slides[currentSlideIndex].classList.add("slide-current");
  }
})

for (var x = 0; i < sliderDots.length; i++) {
  sliderDots[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      popularToolsSlide[currentSlideIndex].classList.remove("slide-current");
      sliderDots[currentSlideIndex].classList.remove("current");
      for (var i = 0; i < sliderDots.length; i++) {
        if (sliderDots[i] === evt.target) {
          currentSlideIndex = i;
          break;
        }
      }
      popularToolsSlide[currentSlideIndex].classList.add("slide-current");
      sliderDots[currentSlideIndex].classList.add("current");
    }
  )
}

