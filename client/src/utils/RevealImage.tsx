import type { JSX } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealImageProps {
  children: JSX.Element | JSX.Element[];
  width?: string;               // optional wrapper width
  overlayColor?: string;        // overlay color
  overlayDuration?: number;     // overlay animation duration
  childPosition?: "normal" | "absolute" | "relative"; // tells the wrapper how to handle child
}

const RevealImage = ({
  children,
  width,
  overlayColor = "orange",
  overlayDuration = 0.75,
  childPosition = "normal",
}: RevealImageProps): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const contentControls = useAnimation();
  const overlayControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      contentControls.start("visible");
      overlayControls.start("visible");
    }
  }, [isInView, contentControls, overlayControls]);

  // Decide wrapper styles based on child position
  const wrapperStyle: React.CSSProperties =
    childPosition === "normal"
      ? { position: "relative", overflow: "hidden" }
      : { position: "relative", overflow: "visible" }; // allow absolute children to escape

  return (
    <div
      ref={ref}
      className={width ?? ""}
      style={wrapperStyle}
    >
      {/* Animate wrapper if childPosition is normal */}
      {childPosition === "normal" ? (
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={contentControls}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          {children}
        </motion.div>
      ) : (
        // Just render the child directly for absolute/relative positioning
        children
      )}

      {/* Overlay */}
      <motion.div
        variants={{
          hidden: { x: "0%" },
          visible: { x: "100%" },
        }}
        initial="hidden"
        animate={overlayControls}
        transition={{ duration: overlayDuration, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: overlayColor,
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default RevealImage;
