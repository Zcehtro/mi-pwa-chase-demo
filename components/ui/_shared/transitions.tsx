import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  out: { opacity: 1, x: "-100%", transition: { duration: 0.75 } },
  in: { opacity: 1, x: "0", transition: { duration: 0.75, delay: 0.5 } },
};
export const Transition = ({ children }: any) => {
  const { asPath } = useRouter();

  return (
    <motion.main
      key={asPath}
      variants={variants}
      animate="in"
      initial="out"
      exit="out"
      transition={{ type: "linear" }}
    >
      {children}
    </motion.main>
  );
};
