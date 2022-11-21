import React, { memo, PropsWithChildren, useMemo } from "react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { Container, Box } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spacer } from "../system/Spacer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import { APP_NAME } from "@/const";

interface Props {
  title?: string;
}

const queryClient = new QueryClient();

export const Layout: React.FC<PropsWithChildren<Props>> = memo(
  ({ children, title = APP_NAME }) => {
    const seoTitle = useMemo(() => {
      return title !== APP_NAME ? `${title} | ${APP_NAME}` : APP_NAME;
    }, [title]);
    return (
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily:
              '"Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif',
          }}
        >
          <NotificationsProvider>
            <Head>
              <title>{seoTitle}</title>
            </Head>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[1],
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              })}
              style={{ minHeight: "100dvh" }}
            >
              {/* <Header /> */}
              <Container>
                <main>{children}</main>
              </Container>
              <Spacer />
              {/* <Footer /> */}
            </Box>
          </NotificationsProvider>
        </MantineProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    );
  }
);
