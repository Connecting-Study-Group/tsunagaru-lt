import { EventCollection } from "@/repository/eventCollectionRepository";
import React, { memo, useMemo } from "react";
import { useCallback } from "react";
import { PageTitle } from "../atoms/PageTitle";
import Link from "next/link";

interface Props {
  eventCollection: Record<string, EventCollection> | null;
  isLoading: Boolean;
}

export const EventsPage: React.FC<Props> = memo(
  ({ isLoading, eventCollection }) => {
    // イベントごとのキー情報
    const eventCollectionKeys = useMemo(() => {
      if (eventCollection) {
        return Object.keys(eventCollection);
      }
      return [];
    }, [eventCollection]);
    /**
     * イベントに資料を登録したユーザー一覧の取得
     */
    const getUserList = useCallback(
      (eventId: string) => {
        if (eventCollection) {
          const eventData = eventCollection[eventId];
          return Object.keys(eventData);
        }
        return [];
      },
      [eventCollection]
    );
    /**
     * 資料データの取得
     */
    const getDocument = useCallback(
      (eventId: string, userId: string) => {
        if (eventCollection) {
          const eventData = eventCollection[eventId][userId];
          return eventData || null;
        }
        return null;
      },
      [eventCollection]
    );
    console.log(eventCollectionKeys);
    if (isLoading) {
      <div>Loading...</div>;
    }
    return (
      <>
        <PageTitle>勉強会一覧</PageTitle>
        {!eventCollectionKeys.length ? (
          <p>データなし</p>
        ) : (
          <>
            {eventCollectionKeys.map((eventId) => (
              <React.Fragment key={eventId}>
                <Link href={`/events/${eventId}`}>
                  <article>
                    <p>{eventId}開催</p>
                    <span>{`資料${
                      Object.keys(eventCollection![eventId]).length
                    }件`}</span>
                    <div>
                      {!getUserList(eventId).length ? (
                        <p>データなし</p>
                      ) : (
                        <>
                          {getUserList(eventId).map((userId) => {
                            const document = getDocument(eventId, userId);
                            if (!document) return <></>;
                            return (
                              <React.Fragment key={userId}>
                                <Link href={`/documents/${userId}`}>
                                  <div>
                                    <span>{document.emoji}</span>
                                    <span>{document.title}</span>
                                    <span>{document.name}</span>
                                  </div>
                                </Link>
                              </React.Fragment>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </article>
                </Link>
              </React.Fragment>
            ))}
          </>
        )}
      </>
    );
  }
);
