import { DocumentUploadPage } from "@/components/pages/DpcumentUploadPage";
import { Layout } from "@/components/template/Layout";
import { useRouter } from "next/router";
import React, { ReactElement, useMemo } from "react";

const Upload = (): JSX.Element => {
  const router = useRouter();
  const eventId = useMemo(() => router.query.eventId as string, [router]);
  return <DocumentUploadPage eventId={eventId} />;
};

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="資料の追加">{page}</Layout>;
};

export default Upload;
