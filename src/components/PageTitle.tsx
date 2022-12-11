import { Text } from "@mantine/core"
import React, { memo, PropsWithChildren } from "react"

interface Props {
  as?: string
}

export const PageTitle: React.FC<PropsWithChildren<Props>> = memo(({ children, as = "h1" }) => {
  return <Text component={as as any}>{children}</Text>
})
