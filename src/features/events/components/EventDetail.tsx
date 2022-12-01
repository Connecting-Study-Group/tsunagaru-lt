import { Button, Group } from "@mantine/core";
import Link from "next/link";
import React, { memo } from "react";
import { DocumentCard } from "@/components/DocumentCard";
import { useEventDetail } from "../api/getEventDetail";
import { useEventDetailData } from "../hooks/useEventDetailData";
import { UploadDocumentFloatingButton } from "./UploadDocumentFloatingButton";

interface Props {
  eventId: string;
}

export const EventDetail: React.FC<Props> = memo(({ eventId }) => {
  const { data, isLoading } = useEventDetail({ eventId });
  const {userList, getDocument} = useEventDetailData(data)
  console.log(data)
  // ローディング
  if (isLoading) return <p>Loading...</p>;
  // データ0件
  if (!userList.length) return (
  <>
      <p>no data</p>
      <UploadDocumentFloatingButton url={`/events/${eventId}/upload`} />
  </>
  );
  return (
    <>
        <Group>
          {userList.map((userId) => {
            const document = getDocument(userId);
            console.log(userList)
            return (
              <React.Fragment key={userId}>
                <Link href={`/events/${eventId}/documents/${userId}`}>
                  <DocumentCard
                    emoji={document?.emoji || ""}
                    title={document?.title || ""}
                    name={document?.name || ""}
                  />
                </Link>
              </React.Fragment>
            );
          })}
        </Group>
        <UploadDocumentFloatingButton url={`/events/${eventId}/upload`} />
    </>
  );
});
