import React, { ReactElement } from "react";
import { EventListPage } from "@/features/misc/pages/EventList";
import { DefaultLayout } from "@/layouts/Default";

const Events = (): JSX.Element => {
  return <EventListPage />;
};

Events.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="勉強会一覧">{page}</DefaultLayout>;
};

export default Events;
