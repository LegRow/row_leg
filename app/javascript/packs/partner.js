function initSlideShow() {
  const slides = document.querySelectorAll('.slide')
  const time = 3000
  let index = 0;
  const addActive = (index) => { slides[index].classList.add('active') }
  const removeActive = (index) => { slides[index].classList.remove('active') }

  addActive(index)

  setInterval( () => {
    removeActive(index)
    index++;
    if (index === slides.length) index = 0;
    addActive(index);
  }, time);
}

document.addEventListener('turbolinks:load', function(){
  const slideshows = document.querySelectorAll('[data-component="slideshow"]');
  slideshows.forEach(initSlideShow);
})