import React, { memo, PropsWithChildren } from "react";
import { Text } from "@mantine/core";

interface Props {
  as?: string;
}

export const PageTitle: React.FC<PropsWithChildren<Props>> = memo(
  ({ children, as = "h1" }) => {
    return <Text component={as as any}>{children}</Text>;
  }
);
