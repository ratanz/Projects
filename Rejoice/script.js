

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
        stagger: 0.25,
        duration: 1,
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 47%",
            end: "top 37%",
            scrub: 2
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

function swiperjs() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        }
    });
}

function loaderAnimation(){

    var tl = gsap.timeline()

    tl.from(".loader h3", {
        x: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    })
    
    tl.to(".loader h3", {
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 1
    })
    
    
    tl.to(".loader", {
        opacity: 0,
    
    })
    
    tl.from(".page1-content h1 span", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        delay: -0.5
    })
    
    tl.to(".loader", {
        display: "none"
    })
}

function aboutAnimation(){
    // Add GSAP for finer control if needed
gsap.fromTo(".bottom-text h1::before",
    {
        x: "-100%" // Start off-screen to the left
    },
    {
        x: "100%", // End off-screen to the right
        duration: 0.5, // Animation duration
        ease: "power1.inOut",
        paused: true // Initially paused
    }
);

// Event listeners for hover effect
document.querySelector('.bottom-text h1').addEventListener('mouseenter', () => {
    gsap.to(".bottom-text h1::before", { x: "0%", duration: 0.5, ease: "power1.inOut" });
});

document.querySelector('.bottom-text h1').addEventListener('mouseleave', () => {
    gsap.to(".bottom-text h1::before", { x: "100%", duration: 0.5, ease: "power1.inOut" });
});

}

function footerAnimation() {
    // Create a GSAP timeline, initially paused
    let tl = gsap.timeline({ paused: true });

    // Define the animation for the h1 span elements
    tl.from(".footer-content", {
        y: -90, // Start from 100px down
        opacity: 0, // Start with opacity 0
        stagger: 0.7, // Stagger the animation for each span
        duration: 0.5, // Duration of the animation
    });

    // Ensure the animation reverses properly
    tl.to(".bottom-part2 h1 span", {
        y: 80, // End at original position
        opacity: 1, // End with full opacity
        stagger: 0.2, // Stagger the animation for each span
        duration: 0.1, // Duration of the animation
    });

    // Select the footer element
    const footerElement = document.querySelector('.footer');

    // Ensure the element exists
    if (footerElement) {
        // Add event listeners to play and reverse the animation on hover
        footerElement.addEventListener('mouseenter', () => {
            tl.restart(); // Restart the animation on mouse enter
        });

        footerElement.addEventListener('mouseleave', () => {
            tl.reverse(); // Reverse the animation on mouse leave
        });
    } 
}

loaderAnimation()
cursorEffect()
page2Animation()
aboutAnimation()
footerAnimation()
animatePage4SVG()
swiperjs()


