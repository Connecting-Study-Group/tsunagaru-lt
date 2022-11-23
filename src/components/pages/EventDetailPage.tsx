import { EventCollection } from "@/repository/eventRepository";
import { Button } from "@mantine/core";
import Link from "next/link";
import React, { memo, useCallback, useMemo } from "react";
import { PageTitle } from "../atoms/PageTitle";

interface Props {
  eventId: string;
  eventData: EventCollection | null;
  isLoading: boolean;
  title: string;
  handleOpenAddDocumentModal: () => void;
}

export const EventDetailPage: React.FC<Props> = memo(
  ({ eventId, eventData, isLoading, title, handleOpenAddDocumentModal }) => {
    const userList = useMemo(() => {
      if (eventData) {
        return Object.keys(eventData);
      }
      return [];
    }, [eventData]);
    /**
     * 資料データの取得
     */
    const getDocument = useCallback(
      (userId: string) => {
        if (eventData) {
          return eventData[userId] || null;
        }
        return null;
      },
      [eventData]
    );
    if (isLoading) return <p>Loading...</p>;
    return (
      <>
        <PageTitle>{title}</PageTitle>
        {!userList.length ? (
          <p>no data</p>
        ) : (
          <>
            {userList.map((userId) => {
              const document = getDocument(userId);
              return (
                <React.Fragment key={userId}>
                  <Link href={`/events/${eventId}/documents/${userId}`}>
                    <div>
                      <span>{document?.emoji}</span>
                      <span>{document?.title}</span>
                      <span>{document?.name}</span>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}
          </>
        )}
        <Link href={`/events/${eventId}/upload`} passHref>
        <Button component="a">資料の追加</Button>
        </Link>
      </>
    );
  }
);
