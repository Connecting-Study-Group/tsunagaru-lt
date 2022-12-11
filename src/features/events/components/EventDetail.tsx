import { Group } from "@mantine/core"
import Link from "next/link"
import React, { memo, useMemo } from "react"

import { DocumentCard } from "@/components/DocumentCard"
import { PageTitle } from "@/components/PageTitle"
import { EventId } from "@/types"

import { useEventDetail } from "../api/getEventDetail"
import { useEventDetailData } from "../hooks/useEventDetailData"
import { UploadDocumentFloatingButton } from "./UploadDocumentFloatingButton"

interface Props {
  eventId: EventId
}

export const EventDetail: React.FC<Props> = memo(({ eventId }) => {
  const { data, isLoading } = useEventDetail({ eventId })
  const { userList, getDocument } = useEventDetailData(data)
  const pageTitle = useMemo(() => {
    return `${eventId}開催`
  }, [eventId])
  // ローディング
  if (isLoading)
    return (
      <>
        <PageTitle>{pageTitle}</PageTitle>
        <p>Loading...</p>
      </>
    )
  // データ0件
  if (!userList.length)
    return (
      <>
        <PageTitle>{pageTitle}</PageTitle>
        <p>no data</p>
        <UploadDocumentFloatingButton url={`/events/${eventId}/upload`} />
      </>
    )
  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <Group>
        {userList.map((userId) => {
          const document = getDocument(userId)
          return (
            <React.Fragment key={userId}>
              <Link href={`/events/${eventId}/documents/${userId}`} style={{ textDecoration: "none" }}>
                <DocumentCard emoji={document?.emoji || ""} title={document?.title || ""} name={document?.name || ""} />
              </Link>
            </React.Fragment>
          )
        })}
      </Group>
      <UploadDocumentFloatingButton url={`/events/${eventId}/upload`} />
    </>
  )
})
