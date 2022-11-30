import React, { memo } from "react";
import { PageTitle } from "@/components/PageTitle";
import { EventList } from "@/features/eventList";

export const EventListPage: React.FC = memo(
  () => {
    return (
      <>
        <PageTitle>勉強会一覧</PageTitle>
        <EventList />
      </>
    );
  }
);