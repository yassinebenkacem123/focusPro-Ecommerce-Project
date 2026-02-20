document.addEventListener("DOMContentLoaded", () => {
    const gsapInstance = window.gsap;
    const scrollTrigger = window.ScrollTrigger;

    if (!gsapInstance) {
        console.error("GSAP not found. Make sure gsap.min.js is loaded before script.js");
        return;
    }

    if (!scrollTrigger) {
        console.error(
            "ScrollTrigger not found. Make sure ScrollTrigger.min.js is loaded before script.js"
        );
        return;
    }

    gsapInstance.registerPlugin(scrollTrigger);

    const cards = Array.from(document.querySelectorAll(".sticky-cards .card"));
    const totalCards = cards.length;
    if (totalCards === 0) return;

    const segmentSize = 1 / totalCards;
    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, index) => {
        gsapInstance.set(card, {
            xPercent: -50,
            yPercent: -50 + index * cardYOffset,
            scale: 1 - index * cardScaleStep,
        });
    });

    scrollTrigger.create({
        trigger: ".sticky-cards",
        start: "top top",
        end: () => `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(
                Math.floor(progress / segmentSize),
                totalCards - 1
            );

            const segProgress =
                (progress - activeIndex * segmentSize) / segmentSize;

            cards.forEach((card, index) => {
                if (index < activeIndex) {
                    gsapInstance.set(card, {
                        yPercent: -250,
                        rotationX: 35,
                        scale: 1,
                    });
                    return;
                }

                if (index === activeIndex) {
                    gsapInstance.set(card, {
                        yPercent: gsapInstance.utils.interpolate(
                            -50,
                            -250,
                            segProgress
                        ),
                        rotationX: gsapInstance.utils.interpolate(
                            0,
                            35,
                            segProgress
                        ),
                        scale: 1,
                    });
                    return;
                }

                const behindIndex = index - activeIndex;
                const currentYOffset = (behindIndex - segProgress) * cardYOffset;
                const currentScale =
                    1 - (behindIndex - segProgress) * cardScaleStep;

                gsapInstance.set(card, {
                    yPercent: -50 + currentYOffset,
                    rotationX: 0,
                    scale: currentScale,
                });
            });
        },
    });
});