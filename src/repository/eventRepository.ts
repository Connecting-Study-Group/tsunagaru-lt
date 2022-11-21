import { FileData } from "@/types/document";
import axios, { AxiosPromise } from "axios";

export type EventCollection = Record<string, FileData>;

export type EventCollectionResponse = {
  data: Record<string, EventCollection>;
};

export type EventDetailResponse = {
  data: EventCollection;
};

class EventCollectionRepository {
  public static findAll(): AxiosPromise<EventCollectionResponse> {
    return axios.get(`/api/event-collection`);
  }
}

class EventDetailRepository {
  public static findAll(req: {
    eventId: string;
  }): AxiosPromise<EventDetailResponse> {
    return axios.get(`/api/event-detail?eventId=${req.eventId}`);
  }
}

export { EventCollectionRepository, EventDetailRepository };
