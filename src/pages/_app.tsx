import "@/common/styles/globals.css";

import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
// next
import { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";
// redux
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export default function App(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ReduxProvider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    </CacheProvider>
  );
}
