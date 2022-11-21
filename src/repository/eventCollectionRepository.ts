import axios, { AxiosPromise } from "axios";

export type FileData = {
  name: string;
  file: string | null;
  url: string | null;
  emoji: string;
};

export type EventCollection = Record<string, FileData>;

export type EventCollectionResponse = {
  data: Record<string, EventCollection>;
};

export type BaseResponse = {
  status: string;
};

export type EventCollectionUpdateRequest = EventCollection;

class EventCollectionRepository {
  public static findAll(): AxiosPromise<EventCollectionResponse> {
    return axios.get(`/api/event-collection`);
  }

  public static update(
    req: EventCollectionUpdateRequest
  ): AxiosPromise<BaseResponse> {
    return axios.put(`/api/products/put?id=${req.id}`, req);
  }
}

export { EventCollectionRepository };
