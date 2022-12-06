import { PageTitle } from "@/components/PageTitle";
import { DocumentId, EventId } from "@/types";
import React, { memo } from "react";
import { useDocumentDetail } from "../api/getDocument";

interface Props {
  eventId: EventId;
  documentId: DocumentId;
}

export const DocumentDetail: React.FC<Props> = memo(
  ({ eventId, documentId }) => {
    const { data, isLoading } = useDocumentDetail({ eventId, documentId });
    console.log(data);
    // ローディング
    if (isLoading) return <p>Loading...</p>;
    //   データがない場合
    if (!data) return <p>no data</p>;
    return (
      <>
        <PageTitle>{data.title}</PageTitle>
        <div>
          <span>{data.emoji}</span>
          <span>{data.title}</span>
          <span>{data.name}</span>
        </div>
      </>
    );
  }
);
