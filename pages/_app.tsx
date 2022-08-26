import "../styles/globals.css";
import "../styles/transition.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { lightTheme } from "../themes";
import { UIProvider } from "../context/ui";
import { USERProvider } from "../context/user";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { Transition } from "../components/ui";
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Transition>
      <UIProvider>
        <USERProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </USERProvider>
      </UIProvider>
    </Transition>
  );
}

export default MyApp;
