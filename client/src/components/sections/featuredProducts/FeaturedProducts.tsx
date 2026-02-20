import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container) return;

            const cards = gsap.utils.toArray<HTMLElement>(".card", container);
            const totalCards = cards.length;
            if (totalCards === 0) return;

            // Keep the last card visible at the end.
            // We only need to animate (totalCards - 1) cards out.
            const segmentCount = Math.max(totalCards - 1, 1);

            const segmentSize = 1 / segmentCount;
            const cardYOffset = 5;
            const cardScaleStep = 0.075;

            cards.forEach((card, index) => {
                gsap.set(card, {
                    xPercent: -50,
                    yPercent: -50 + index * cardYOffset,
                    scale: 1 - index * cardScaleStep,
                });
            });

            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${window.innerHeight * 8}px`,
                pin: container,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const activeIndex = Math.min(
                        Math.floor(progress / segmentSize),
                        segmentCount - 1
                    );

                    const segProgress =
                        (progress - activeIndex * segmentSize) / segmentSize;

                    cards.forEach((card, index) => {
                        if (index < activeIndex) {
                            gsap.set(card, {
                                yPercent: -250,
                                rotationX: 35,
                                scale: 1,
                            });
                            return;
                        }

                        if (index === activeIndex) {
                            gsap.set(card, {
                                yPercent: gsap.utils.interpolate(-50, -250, segProgress),
                                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                                scale: 1,
                            });
                            return;
                        }

                        const behindIndex = index - activeIndex;
                        const currentYOffset = (behindIndex - segProgress) * cardYOffset;
                        const currentScale =
                            1 - (behindIndex - segProgress) * cardScaleStep;

                        gsap.set(card, {
                            yPercent: -50 + currentYOffset,
                            rotationX: 0,
                            scale: currentScale,
                        });
                    });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full  h-screen overflow-hidden sticky-cards"
        >
            <div className="card" id="card-1">
                <div className="col">
                    <p className="text-2xl font-medium uppercase">Quiet Control</p>
                    <h1 className="text-[3rem] leading-none font-barlow uppercase font-extrabold">
                        Signal Drift
                    </h1>
                </div>
                <div className="col">
                    <img
                        className="w-full h-full object-cover"
                        alt=""
                        src="/slides/slide-1.jpg"
                    />
                </div>
            </div>
            <div className="card" id="card-2">
                <div className="col">
                    <p className="text-2xl font-medium uppercase">Quiet Control</p>
                    <h1 className="text-[3rem] leading-none font-barlow uppercase font-extrabold">
                        Signal Drift
                    </h1>
                </div>
                <div className="col">
                    <img
                        className="w-full h-full object-cover"
                        alt=""
                        src="/slides/slide-2.jpg"
                    />
                </div>
            </div>
            <div className="card" id="card-3">
                <div className="col">
                    <p className="text-2xl font-medium uppercase">Quiet Control</p>
                    <h1 className="text-[3rem] leading-none font-barlow uppercase font-extrabold">
                        Signal Drift
                    </h1>
                </div>
                <div className="col">
                    <img
                        className="w-full h-full object-cover"
                        alt=""
                        src="/slides/slide-3.jpg"
                    />
                </div>
            </div>
            <div className="card" id="card-4">
                <div className="col">
                    <p className="text-2xl font-medium uppercase">Quiet Control</p>
                    <h1 className="text-[3rem] leading-none font-barlow uppercase font-extrabold">
                        Signal Drift
                    </h1>
                </div>
                <div className="col">
                    <img
                        className="w-full h-full object-cover"
                        alt=""
                        src="/slides/slide-4.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;