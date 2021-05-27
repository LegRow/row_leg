document.addEventListener('turbolinks:load', function(){
  const slideshows = document.querySelectorAll('[data-component="slideshow"]');
  slideshows.forEach(initSlideShow);
  function initSlideShow(slideshow) {
  const slides = document.querySelectorAll('.slide');
  let index = 0, time = 3000;
	slides[index].classList.add('active');

	setInterval( () => {
		slides[index].classList.remove('active');
    index++;
		if (index === slides.length) index = 0;
    slides[index].classList.add('active');
    }, time);
  }
})
