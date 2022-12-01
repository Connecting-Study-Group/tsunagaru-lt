import { UserId } from "@/types";
import { DocumentData } from "@/types/document";

export type EventCollection = Record<UserId, DocumentData>;
