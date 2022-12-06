import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): ReactNode {
  useEffect(() => {
    document.documentElement.style.visibility = "visible";
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}
