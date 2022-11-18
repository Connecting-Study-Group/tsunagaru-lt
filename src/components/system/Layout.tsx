import React, { memo, PropsWithChildren } from "react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
import { Container, Box } from "@mantine/core";
import { Spacer } from "./Spacer";

export const Layout: React.FC<PropsWithChildren<{}>> = memo(({ children }) => {
  return (
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
  );
});
