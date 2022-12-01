import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { EventCollection } from "../types";

export const getEventList = (): Promise<Record<string, EventCollection>> => {
  return axios.get(`/api/event-collection`);
};

type QueryFnType = typeof getEventList;

type UseEventListOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useEventList = ({ config }: UseEventListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["event-collection"],
    queryFn: () => getEventList(),
    ...config,
  });
};
