import React, { memo } from "react";
import { PageTitle } from "../../../components/PageTitle";
import {Form} from "@/features/documents/components/Form";

export const DocumentUploadPage: React.FC = memo(
  () => {
    return (
      <>
        <PageTitle>資料の投稿</PageTitle>
        <Form />
      </>
    );
  }
);
