import { Text } from "@mantine/core";
import React, { memo } from "react";
import { Header } from '@mantine/core';

export const AppHeader = memo(() => {
  return (
    <Header  height={60} p="xs">
      <Text component="h1" sx={{ fontFamily: "Mona Sans" }}>
        つながるLT
      </Text>
    </Header>
  );
});
