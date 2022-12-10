import React, { memo } from "react"
import { Button } from "@mantine/core"
import Link from "next/link"

interface Props {
  url: string
}

export const UploadDocumentFloatingButton: React.FC<Props> = memo(({ url }) => {
  return (
    <Button
      component={Link}
      href={url}
      radius="xl"
      color="dark"
      sx={{
        position: "fixed",
        right: "100px",
        bottom: "100px",
        filter: "drop-shadow(0px 12px 8px rgba(0, 0, 0, 0.16))",
      }}
    >
      資料の追加
    </Button>
  )
})
