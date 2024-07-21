
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

cursorEffect()

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

page2Animation()

