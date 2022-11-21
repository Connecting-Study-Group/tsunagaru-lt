import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import {
  EventDetailRepository,
  EventDetailResponse,
} from "@/repository/eventRepository";
import React, { ReactElement, useCallback, useMemo } from "react";
import { Layout } from "@/components/template/Layout";
import { EventDetailPage } from "@/components/pages/EventDetailPage";
import { useRouter } from "next/router";

const EventDetail = (): JSX.Element => {
  const router = useRouter();
  const eventId = useMemo(() => router.query.eventId as string, [router]);
  const { isError, isLoading, data } = useQuery(
    ["event-detail", eventId],
    (): AxiosPromise<EventDetailResponse> =>
      EventDetailRepository.findAll({ eventId })
  );
  // イベント詳細データ
  const eventData = useMemo(() => {
    return data ? data.data.data : null;
  }, [data]);
  // 資料の追加
  const handleOpenAddDocumentModal = useCallback(() => console.log("add"), []);
  return (
    <EventDetailPage
      eventId={eventId}
      eventData={eventData}
      isLoading={isLoading}
      title={`${router.query.eventId}開催`}
      handleOpenAddDocumentModal={handleOpenAddDocumentModal}
    />
  );
};

EventDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="勉強会詳細">{page}</Layout>;
};

export default EventDetail;
