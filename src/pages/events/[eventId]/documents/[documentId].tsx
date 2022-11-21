import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import {
  DocumentDetailRepository,
  DocumentDetailResponse,
} from "@/repository/documentRepository";
import React, { ReactElement, useCallback, useMemo } from "react";
import { Layout } from "@/components/template/Layout";
import { DocumentDetailPage } from "@/components/pages/DocumentDetailPage";
import { useRouter } from "next/router";

const DocumentDetail = (): JSX.Element => {
  const router = useRouter();
  const eventId = useMemo(() => router.query.eventId as string, [router]);
  const documentId = useMemo(() => router.query.documentId as string, [router]);
  const { isError, isLoading, data } = useQuery(
    ["document-detail", eventId, documentId],
    (): AxiosPromise<DocumentDetailResponse> =>
      DocumentDetailRepository.findAll({ eventId, documentId })
  );
  // 資料詳細データ
  const documentData = useMemo(() => {
    return data ? data.data.data : null;
  }, [data]);
  return (
    <DocumentDetailPage documentData={documentData} isLoading={isLoading} />
  );
};

DocumentDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="勉強会詳細">{page}</Layout>;
};

export default DocumentDetail;
