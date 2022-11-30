import { useEventList } from "../api/getEventList";
import { PageTitle } from "@/components/PageTitle";
import React from "react";
import Link from "next/link";
import DocumentList from "./DocumentList";
import {useEventListData} from "../hooks/useEventListData"

export const EventList = () => {
  const { data, isLoading } = useEventList({});
  const {eventCollectionKeys} = useEventListData(data)
  // ローディング
  if (isLoading) {
    return <span>loading...</span>;
  }
  // データ0件
  if (data && !Object.keys(data).length) {
    return <span>no data</span>;
  }
  console.log(data)
  return (
    <>
        {eventCollectionKeys.map((eventId) => (
          <React.Fragment key={eventId}>
            <Link href={`/events/${eventId}`}>
              <article>
                <p>{eventId}開催</p>
                <span>{`資料${Object.keys(data![eventId]).length}件`}</span>
                <DocumentList
                  eventId={eventId}
                  data={data}
                />
              </article>
            </Link>
          </React.Fragment>
        ))}
    </>
  );
};
