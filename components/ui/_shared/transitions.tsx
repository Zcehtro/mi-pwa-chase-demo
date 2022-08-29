import { motion } from "framer-motion";
import { useRouter } from "next/router";

//Variants
// The variant object will be passed to the framer-motion component as the variants prop.
//The animation will displace the current view to the left and show the next view coming from the right.
const variants = {
  initial: {
    x: "-100vw",
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const variantss = {
  out: { opacity: 1, x: "-100%", transition: { duration: 0.75 } },
  in: { opacity: 1, x: "0", transition: { duration: 0.75, delay: 0.5 } },
};
export const Transition = ({ children }: any) => {
  const { asPath } = useRouter();

  return (
    <motion.main
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="transition"
    >
      {children}
    </motion.main>
  );
};
