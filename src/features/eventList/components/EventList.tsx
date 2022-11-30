import { useEventList } from "../api/getEventList";
import React from "react";
import Link from "next/link";
import DocumentList from "./DocumentList";
import { useEventListData } from "../hooks/useEventListData";
import { Flex, Paper, Stack } from "@mantine/core";

export const EventList = () => {
  const { data, isLoading } = useEventList({});
  const { eventCollectionKeys } = useEventListData(data);
  // ローディング
  if (isLoading) {
    return <span>loading...</span>;
  }
  // データ0件
  if (data && !Object.keys(data).length) {
    return <span>no data</span>;
  }
  return (
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
  );
};
