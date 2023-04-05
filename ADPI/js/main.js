// Document on load event
window.addEventListener('load', function () {
  document.getElementById("preloader").classList.add("fadehide");
})

// background
var bg_image = document.querySelectorAll('.background'), i;

for (i = 0; i < bg_image.length; ++i) {
  bg_image[i].style.backgroundImage = "url(" + bg_image[i].getAttribute('data-bg') + ")";
};

// // appear
// let observedElements = document.querySelectorAll('.inview-element');
// // Define the elements you want to intiate an action on

// const options = { //define your options
//   threshold: 0.5 //50% of the element in view
// }

// const inViewCallback = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) { // define the event/property you want to use
//       entry.target.classList.add('inview');
//       //do something with the element
//     }
//   });
// }

// let observer = new IntersectionObserver(inViewCallback, options);
// create a new instance using our callback which contains our elements and actions, using the options we defined

// observedElements.forEach(element => {
//   observer.observe(element) // run the observer 
// });

// Glightbox
var lightbox = GLightbox();
lightbox.on('open', (target) => {
  console.log('lightbox opened');
});
var lightboxDescription = GLightbox({
  selector: '.glightbox2'
});
var lightboxVideo = GLightbox({
  selector: '.glightbox3'
});
lightboxVideo.on('slide_changed', ({ prev, current }) => {
  console.log('Prev slide', prev);
  console.log('Current slide', current);

  const { slideIndex, slideNode, slideConfig, player } = current;

  if (player) {
    if (!player.ready) {
      // If player is not ready
      player.on('ready', (event) => {
        // Do something when video is ready
      });
    }

    player.on('play', (event) => {
      console.log('Started play');
    });

    player.on('volumechange', (event) => {
      console.log('Volume change');
    });

    player.on('ended', (event) => {
      console.log('Video ended');
    });
  }
});

var lightboxInlineIframe = GLightbox({
  selector: '.glightbox4'
});

document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".parallax-wrap span").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    const y = (window.innerHeight - event.pageY * position) / 90;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

VanillaTilt.init(document.querySelector(".about-img"), {
  max: 5,
  speed: 200,
});

VanillaTilt.init(document.querySelector(".test-img"), {
  max: 5,
  speed: 200,
});

const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {

  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 60;
    sectionId = current.getAttribute("id");

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document.querySelector(".navbar-nav .nav-item a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navbar-nav .nav-item a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}