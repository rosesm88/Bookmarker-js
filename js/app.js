$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    autoplay:true,
    autoplayTimeout:10000,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 1,

      },
      1000: {
        items: 3,


      }
    }
  })
});





