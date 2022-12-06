import React, { ReactElement } from "react";
import { DefaultLayout } from "@/layouts/Default";
import { EventDetailPage } from "@/features/misc/pages/EventDetail";

const EventDetail = (): JSX.Element => {
  return <EventDetailPage />;
};

EventDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="勉強会詳細">{page}</DefaultLayout>;
};

export default EventDetail;
