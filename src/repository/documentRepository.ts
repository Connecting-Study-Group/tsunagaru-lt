import axios, { AxiosPromise } from "axios";
import { FileData } from "@/types/document";
import { BaseResponse } from "@/types";

export type DocumentDetailResponse = {
  data: FileData;
};

export type DocumentDetailUpdateRequest = FileData;

class DocumentDetailRepository {
  public static findAll(req: {
    eventId: string;
    documentId: string;
  }): AxiosPromise<DocumentDetailResponse> {
    return axios.get(
      `/api/document-detail?eventId=${req.eventId}&documentId=${req.documentId}`
    );
  }
  public static update(
    req: DocumentDetailUpdateRequest
  ): AxiosPromise<BaseResponse> {
    return axios.put(`/api/document-collection`, req);
  }
}

export { DocumentDetailRepository };
