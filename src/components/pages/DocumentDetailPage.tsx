import { FileData } from "@/types/document";
import { Button } from "@mantine/core";
import React, { memo } from "react";
import { PageTitle } from "../atoms/PageTitle";

interface Props {
  documentData: FileData | null;
  isLoading: boolean;
}

export const DocumentDetailPage: React.FC<Props> = memo(
  ({ documentData, isLoading }) => {
    if (isLoading || !documentData) return <p>Loading...</p>;
    return (
      <>
        <PageTitle>{documentData.title}</PageTitle>

        <div>
          <span>{documentData.emoji}</span>
          <span>{documentData.title}</span>
          <span>{documentData.name}</span>
        </div>
      </>
      // <Button onClick={handleOpenAddDocumentModal}>資料の追加</Button>
    );
  }
);
