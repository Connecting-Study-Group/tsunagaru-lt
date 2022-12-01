import { EventDetail } from "@/features/events";
import React, { memo } from "react";
import { PageTitle } from "../../../components/PageTitle";
import { useRouterQuery } from "@/hooks/useRouterQuery";

export const EventDetailPage: React.FC = memo(
  () => {
  const eventId = useRouterQuery("eventId");
    return (
      <>
        <PageTitle>{`${eventId}開催`}</PageTitle>
        <EventDetail eventId={eventId} />
      </>
    );
  }
);
