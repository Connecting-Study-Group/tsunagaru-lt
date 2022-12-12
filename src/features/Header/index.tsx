import { Text, Header } from "@mantine/core"
import React, { memo } from "react"

export const AppHeader = memo(() => {
  return (
    <Header height={60} p="xs">
      <Text component="h1" sx={{ fontFamily: "Mona Sans" }}>
        つながるLT
      </Text>
    </Header>
  )
})
