import { motion } from "framer-motion";

const transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
    const WrappedComponent = (props: P) => (
        <>
            {/* Reveal current page on mount */}
            <motion.div
                className="slide-in"
                initial={{ scaleY: 1, originY: 0 }}
                animate={{ scaleY: 0, originY: 0 }}
                exit={{ scaleY: 0, originY: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <OgComponent {...props} />

            {/* Cover page on route change */}
            <motion.div
                className="slide-out"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 0, originY: 1 }}
                exit={{ scaleY: 1, originY: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    );

    return WrappedComponent;
};

export default transition;