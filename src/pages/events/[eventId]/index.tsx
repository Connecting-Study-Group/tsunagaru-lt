import React, { ReactElement } from "react"

import { EventDetailPage } from "@/features/misc/pages/EventDetail"
import { DefaultLayout } from "@/layouts/Default"

const EventDetail = (): JSX.Element => {
  return <EventDetailPage />
}

EventDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="勉強会詳細">{page}</DefaultLayout>
}

export default EventDetail
