import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import {
  EventCollectionRepository,
  EventCollectionResponse,
} from "@/repository/eventRepository";
import { DocumentUploadPage } from "@/components/pages/DocumentUploadPage";
import { Layout } from "@/components/template/Layout";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useMemo } from "react";
import {
  DocumentDetailRepository,
  DocumentDetailUpdateRequest,
} from "@/repository/documentRepository";

const Upload = (): JSX.Element => {
  const router = useRouter();
  const eventId = useMemo(() => router.query.eventId as string, [router]);
  const { isError, isLoading, data } = useQuery(
    ["event-collection"],
    (): AxiosPromise<EventCollectionResponse> =>
      EventCollectionRepository.findAll()
  );
  const eventCollection = useMemo(() => {
    return data ? data.data.data : null;
  }, [data]);
  return (
    <DocumentUploadPage eventId={eventId} eventCollection={eventCollection} />
  );
};

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="資料の追加">{page}</Layout>;
};

export default Upload;
