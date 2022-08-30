import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Variants
// The variant object will be passed to the framer-motion component as the variants prop.
// The animation will displace the current view to the left and show the next view coming from the right.

export const TransitionSlide = ({ children }: any) => {
  const variants = {
    out: {
      x: "100vw",
      transition: {
        duration: 0.75,
        delay: 0.5,
      },
    },
    hidden: {
      x: "-100vw",
      transition: {
        duration: 0.75,
        delay: 0.5,
      },
    },
    in: {
      x: "0",
      transition: {
        duration: 0.75,
        delay: 0.5,
      },
    },
  };

  const { asPath } = useRouter();

  return (
    // <AnimatePresence>
    <motion.main
      animate="in"
      initial="hidden"
      exit="out"
      variants={variants}
      className="transition"
    >
      {children}
    </motion.main>
    // </AnimatePresence>
  );
};
