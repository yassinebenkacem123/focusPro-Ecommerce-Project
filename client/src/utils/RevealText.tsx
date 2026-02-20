import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useMemo, type ElementType } from "react";

type RevealTextProps<T extends ElementType = "div"> = {
  children: React.ReactNode;
  as?: T;
  delay?: number;
  className?: string;
};

const RevealText = <T extends ElementType = "div">(
  { children, as, delay = 0.25, className = "" }: RevealTextProps<T>
) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const Component = (as ?? "div") as ElementType;

  const MotionComponent = useMemo(
    () => motion(Component),
    [Component]
  );

  return (
    <MotionComponent
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.75, delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default RevealText;
