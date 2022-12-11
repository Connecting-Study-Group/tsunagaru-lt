import React, { memo } from "react"

import { EventDetail } from "@/features/events"
import { useRouterQuery } from "@/hooks/useRouterQuery"

export const EventDetailPage: React.FC = memo(() => {
  const eventId = useRouterQuery("eventId")
  return <EventDetail eventId={eventId} />
})
