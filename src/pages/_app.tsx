import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  useEffect(() => {
    document.documentElement.style.visibility = "visible";
  }, []);
  return (
    <SessionProvider session={pageProps?.session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily:
            '"Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif',
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
