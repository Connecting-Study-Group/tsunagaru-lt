import { EventDetail } from "@/features/eventDetail/components/EventDetail";
import React, { memo, useMemo } from "react";
import { useRouter } from "next/router";
import { PageTitle } from "../../../components/PageTitle";

export const EventDetailPage: React.FC = memo(
  () => {
    const router = useRouter();
  const eventId = useMemo(() => router.query.eventId as string, [router]);
    return (
      <>
        <PageTitle>{`${eventId}開催`}</PageTitle>
        <EventDetail eventId={eventId} />
      </>
    );
  }
);
