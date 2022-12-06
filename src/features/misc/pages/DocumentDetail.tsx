import React, { memo } from "react";
import { DocumentDetail } from "@/features/documents";
import { useRouterQuery } from "@/hooks/useRouterQuery";

export const DocumentDetailPage: React.FC = memo(() => {
  const eventId = useRouterQuery("eventId");
  const documentId = useRouterQuery("documentId");
  return (
    <>
      <DocumentDetail eventId={eventId} documentId={documentId} />
    </>
  );
});
