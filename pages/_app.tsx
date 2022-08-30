import "../styles/globals.css";
import "../styles/transition.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { lightTheme } from "../themes";
import { UIProvider } from "../context/ui";
import { USERProvider } from "../context/user";
// import { AnimatePresence } from "framer-motion";
// import { Transition } from "../components/ui/_shared/transitions";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <UIProvider>
      <USERProvider>
        <ThemeProvider theme={lightTheme}>
          <div className="effect-1">
            <AnimatePresence exitBeforeEnter initial={false}>
              <Component {...pageProps} key={asPath} />
            </AnimatePresence>
          </div>
        </ThemeProvider>
      </USERProvider>
    </UIProvider>
  );
}

export default MyApp;
