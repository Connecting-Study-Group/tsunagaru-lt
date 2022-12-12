import { Flex, Paper, Stack } from "@mantine/core"
import Link from "next/link"
import React from "react"

import { PageTitle } from "@/components/PageTitle"

import { useEventList } from "../api/getEventList"
import { useEventListData } from "../hooks/useEventListData"
import DocumentList from "./DocumentList"

export const EventList = () => {
  const { data, isLoading } = useEventList({})
  const { eventCollectionKeys } = useEventListData(data)
  // ローディング
  if (isLoading) {
    return (
      <>
        <PageTitle>勉強会一覧</PageTitle>
        <span>loading...</span>
      </>
    )
  }
  // データ0件
  if (data && !Object.keys(data).length) {
    return (
      <>
        <PageTitle>勉強会一覧</PageTitle>
        <span>no data</span>
      </>
    )
  }
  return (
    <>
      <PageTitle>勉強会一覧</PageTitle>
      <Stack spacing="lg">
        {eventCollectionKeys.map((eventId) => (
          <React.Fragment key={eventId}>
            <Link href={`/events/${eventId}`}>
              <Paper component="article" shadow="xs" p="md">
                <Flex justify="space-between" align="center">
                  <p>{eventId}開催</p>
                  <span>{`資料${Object.keys(data![eventId]).length}件`}</span>
                </Flex>
                <DocumentList eventId={eventId} data={data} />
              </Paper>
            </Link>
          </React.Fragment>
        ))}
      </Stack>
    </>
  )
}
