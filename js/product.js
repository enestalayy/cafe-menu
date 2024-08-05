// Card
var swiper = new Swiper('.product-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.product-slider__pagination',
    clickable: true,
  }
});
// Product Video
const video = document.querySelectorAll("#bgvid");
const playbtn = document.querySelectorAll(".product-video-container");
for(let i=0; i<playbtn.length; i++){
  playbtn[i].addEventListener("click",function(e){
      video[i].play();        
      e.preventDefault();
  });
};