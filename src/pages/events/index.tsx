import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import {
  EventCollectionRepository,
  EventCollectionResponse,
} from "@/repository/eventRepository";
import React, { ReactElement, useMemo } from "react";
import { EventsPage } from "@/components/pages/EventsPage";
import { Layout } from "@/components/template/Layout";

const Events = (): JSX.Element => {
  const { isError, isLoading, data } = useQuery(
    ["event-collection"],
    (): AxiosPromise<EventCollectionResponse> =>
      EventCollectionRepository.findAll()
  );
  const eventCollection = useMemo(() => {
    return data ? data.data.data : null;
  }, [data]);
  return <EventsPage eventCollection={eventCollection} isLoading={isLoading} />;
};

Events.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="勉強会一覧">{page}</Layout>;
};

export default Events;
