import axios, { AxiosPromise } from "axios";
import { FileData } from "@/types/document";
import { BaseResponse } from "@/types";

export type DocumentDetailResponse = {
  data: FileData;
};

export interface DocumentDetailCreateRequest {
  name: string;
  user_id: string;
  url?: string | null;
  title: string;
  emoji: string;
  target_event: string;
  file?: {
    data: string;
    type: string;
  } | null;
}
export interface DocumentDetailUpdateRequest {
  name: string;
  user_id: string;
  url: string | null;
  title: string;
  emoji: string;
  target_event: string;
  file: {
    data: string;
    type: string;
  } | null;
  id: string;
}

class DocumentDetailRepository {
  public static findAll(req: {
    eventId: string;
    documentId: string;
  }): AxiosPromise<DocumentDetailResponse> {
    return axios.get(
      `/api/document-detail?eventId=${req.eventId}&documentId=${req.documentId}`
    );
  }
  public static create(
    req: DocumentDetailCreateRequest
  ): AxiosPromise<BaseResponse> {
    return axios.post(`/api/document-detail`, req);
  }
  public static update(
    req: DocumentDetailUpdateRequest
  ): AxiosPromise<BaseResponse> {
    return axios.put(`/api/document-detail`, req);
  }
}

export { DocumentDetailRepository };
