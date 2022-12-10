import React, { memo } from "react"
import { Box } from "@mantine/core"

export const Spacer = memo(() => {
  return (
    <Box
      role="presentation"
      sx={{
        flex: "1 1 0%",
        placeSelf: "stretch",
      }}
    ></Box>
  )
})
