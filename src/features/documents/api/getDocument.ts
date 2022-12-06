import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { EventId, DocumentId } from "@/types";
import { DocumentData } from "@/types/document";

export const getDocumentDetail = (req: {
  eventId: EventId;
  documentId: DocumentId;
}): Promise<DocumentData> => {
  return axios.get(
    `/api/document-detail?eventId=${req.eventId}&documentId=${req.documentId}`
  );
};

type QueryFnType = typeof getDocumentDetail;

type UseEventListOptions = {
  eventId: EventId;
  documentId: DocumentId;
  config?: QueryConfig<QueryFnType>;
};

export const useDocumentDetail = ({
  eventId,
  documentId,
  config,
}: UseEventListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["event-detail", eventId, documentId],
    queryFn: () => getDocumentDetail({ eventId, documentId }),
    ...config,
  });
};
