import { DocumentUploadPage } from "@/features/misc/pages/DocumentUpload";
import { DefaultLayout } from "@/layouts/Default";
import React, { ReactElement,  } from "react";

const Upload = (): JSX.Element => {
  return (
    <DocumentUploadPage />
  );
};

Upload.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="資料の追加">{page}</DefaultLayout>;
};

export default Upload;
