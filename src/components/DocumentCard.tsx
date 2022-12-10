import { Card, Box, Text } from "@mantine/core"
import React, { memo } from "react"

interface Props {
  emoji: string
  title: string
  name: string
}

export const DocumentCard: React.FC<Props> = memo(({ emoji, title, name }) => {
  return (
    <Card shadow="sm" p="md" radius="md" sx={{ width: "160px" }}>
      <Card.Section bg="indigo.0" p="lg" sx={{ justifyContent: "center", display: "flex" }}>
        <Text span fz="50px">
          {emoji}
        </Text>
      </Card.Section>
      <Box mt="xs">
        <Text weight="bold">{title}</Text>
        <Text size={12} mt={4}>
          {name}
        </Text>
      </Box>
    </Card>
  )
})
