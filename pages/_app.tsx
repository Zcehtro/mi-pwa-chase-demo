import '../styles/globals.css';
import '../styles/transition.css';

import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import { ThemeProvider } from '@mui/system';
import { lightTheme } from '../themes';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <div className="effect-1">
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={asPath} />
            </AnimatePresence>
          </div>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
}

export default MyApp;
