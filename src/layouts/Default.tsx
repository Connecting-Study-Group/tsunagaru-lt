import { AppShell, MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Head from "next/head"
import React, { memo, PropsWithChildren, useMemo } from "react"

import { APP_NAME } from "@/constants"
import { AppFooter } from "@/features/Footer"
import { AppHeader } from "@/features/Header"

interface Props {
  title?: string
}

const queryClient = new QueryClient()

export const DefaultLayout: React.FC<PropsWithChildren<Props>> = memo(({ children, title = APP_NAME }) => {
  const seoTitle = useMemo(() => {
    return title !== APP_NAME ? `${title} | ${APP_NAME}` : APP_NAME
  }, [title])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: '"Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif',
        }}
      >
        <Head>
          <title>{seoTitle}</title>
        </Head>
        <AppShell
          padding="md"
          header={<AppHeader />}
          footer={<AppFooter />}
          styles={(theme) => ({
            main: {
              backgroundColor: theme.colors.gray[0],
              minHeight: "100dvh",
            },
          })}
        >
          {children}
        </AppShell>
      </MantineProvider>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
})
