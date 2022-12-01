import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { UserId } from "@/types";
import { DocumentData } from "@/types/document";

export const getEventDetail = (req: {
    eventId: string;
  }): Promise<Record<UserId, DocumentData>> => {
  return axios.get(`/api/event-detail?eventId=${req.eventId}`);
};

type QueryFnType = typeof getEventDetail;

type UseEventListOptions = {
    eventId: string
  config?: QueryConfig<QueryFnType>;
};

export const useEventDetail = ({ eventId, config }: UseEventListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["event-detail", eventId],
    queryFn: () => getEventDetail({eventId}),
    ...config,
  });
};
