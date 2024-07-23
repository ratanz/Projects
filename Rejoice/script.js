
function cursorEffect() {
    var page1Content = document.querySelector(".page1-content")
    var cursor = document.querySelector(".cursor")

    page1Content.addEventListener("mousemove", function (dets) {
        gsap.to(".cursor", {
            x: dets.x,
            y: dets.y
        })
    })

    page1Content.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1
        })
    })

    page1Content.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0
        })
    })
}

function page2Animation() {
    gsap.from(".page2 .text2 span", {
        y: 10,
        stagger : 0.25,
        duration: 1,
        scrollTrigger : {
            trigger : ".page2",
            scroller : ".main",
            start : "top 47%",
            end : "top 37%",
            scrub : 2
        }
    });
}

function animatePage4SVG() {
    const page4 = document.querySelector('.page4');
    const circle = page4.querySelector('svg circle');
    const movingDot = page4.querySelector('#movingDot');

    // Set initial states
    gsap.set(circle, { 
        strokeDasharray: 565.48, // 2 * PI * 90 (circle radius)
        strokeDashoffset: 565.48,
        rotation: -90,
        transformOrigin: "center"
    });

    const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 5, ease: "linear" }
    });

    tl.to(circle, { 
        strokeDashoffset: 0,
        rotation: 270, // Rotate 360 degrees from -90 to 270
        transformOrigin: "center"
    })
   
}

function swiperjs(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
      autoplay: {
        delay : 2000,
        disableOnInteraction: false,
      }
      });
}

cursorEffect()
page2Animation()
animatePage4SVG()
swiperjs()
