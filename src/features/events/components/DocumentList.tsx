import { Group, Paper } from "@mantine/core"
import Link from "next/link"
import React, { memo, useMemo } from "react"

import { DocumentCard } from "@/components/DocumentCard"
import { EventId, UserId } from "@/types"
import { DocumentData } from "@/types/document"

import { useEventListData } from "../hooks/useEventListData"

interface Props {
  eventId: string
  data?: Record<EventId, Record<UserId, DocumentData>>
}

const DocumentList: React.FC<Props> = memo(({ eventId, data }) => {
  const { getUserList, getDocument } = useEventListData(data)
  const userList = useMemo(() => getUserList(eventId), [getUserList])
  return (
    <Paper
      bg="gray.0"
      p="md"
      radius="md"
      sx={{
        minHeight: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: userList.length ? "flex-start" : "center",
      }}
    >
      {!userList.length ? (
        <span>アップロードされた資料はありません</span>
      ) : (
        <Group>
          {userList.map((userId) => {
            const document = getDocument(eventId, userId)
            if (!document) return <></>
            return (
              <React.Fragment key={userId}>
                <Link href={`/events/${eventId}/documents/${userId}`}>
                  <DocumentCard emoji={document.emoji} title={document.title} name={document.name} />
                </Link>
              </React.Fragment>
            )
          })}
        </Group>
      )}
    </Paper>
  )
})

export default DocumentList
