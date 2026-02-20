import { useLayoutEffect, useRef, type JSX } from "react"

import bg from '/exploreSection/bg.jpg'

import img1 from '/exploreSection/image-1.jpg'
import img2 from '/exploreSection/image-2.jpg'
import img3 from '/exploreSection/image-3.jpg'
import img4 from '/exploreSection/image-4.jpg'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);
const ExploreSection = (): JSX.Element => {
  const bg1 = useRef<HTMLDivElement>(null);
  const image_container = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const text1 = useRef<HTMLHeadingElement>(null);
  const text2 = useRef<HTMLParagraphElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: bg1.current,
        pin: bg1.current,
        start: "top top",
        pinSpacing: false,
        end: "bottom bottom",
        endTrigger: ".last"
      });

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: image_container.current,
          pin: image_container.current,
          start: "0% 0%",
          scrub: 1,
        },
      });

      t1.to(img.current, {
        transform: "translateZ(2200px)"
      })
        .to(text1.current, { y: -800 }, "<")
        .to(text2.current, { y: -800 }, "<");

      if (container.current) {
        const height = container.current.offsetHeight;
        gsap.set(container.current, { marginTop: -height });

        t1.fromTo(container.current,
          { yPercent: 100, scaleY: 2 },
          { yPercent: 0, scaleY: 1 }
        );
      }
    });

    return () => ctx.revert();
  }, [])
  return (
    <>
      <div className="relative  overflow-hidden">
        <div ref={bg1} className="bg bg-stone-900 absolute min-h-screen w-screen"></div>
        <section>
          <div ref={image_container}
            className="img-container perspective flex items-center justify-center h-screen w-screen">
            <img
              ref={img}
              className="image"
              src={bg} alt="" />
            <div className="text-white absolute flex flex-col items-center justify-center">
              <h1
                ref={text1}
                className="text-[170px]">
                <span className="text-stroke">
                  Capture
                </span> Vision
              </h1>
              <p
                ref={text2}
                className="opacity-70 w-48 text-[13px] text-center">
                {" "}
                A showcase of the world's best aerial photography</p>
            </div>
          </div>
          <div
            ref={container}
            className="container flex items-center justify-around flex-wrap">

            <div className="col-1 translate-y-[30%] pb-8 flex flex-col gap-15">
              <img
                className="w-112.5 h-100 "
                src={img1} alt="" />
              <img
                className="w-100 h-50"
                src={img2} alt="" />
            </div>


            <div className="col-2 flex flex-col z-14 gap-15 ">
              <img src={img3} alt="" className="w-150 h-100" />
              <img src={img4} alt="" className="w-110 h-145 last" />
            </div>

          </div>

        </section>
      </div>

    </>


  )
}

export default ExploreSection