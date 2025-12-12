gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger);



let mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {

    gsap.utils.toArray("section").forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false
        });
    });

});

//     const sections = document.querySelectorAll("section");

//     sections.forEach((section, i) => {
//         ScrollTrigger.create({
//             trigger: section,
//             start: "top top",
//             // end: "+=100%",      // section jitna height cover karega utna pin rahe
//             pin: true,
//             // pinSpacing: true // pin hone ke baad space na banaye
//             // scrub: true,
//                   // testing ke liye true, remove later
//         });
//     });