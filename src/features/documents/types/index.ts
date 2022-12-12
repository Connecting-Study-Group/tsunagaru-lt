import { FileWithPath, MIME_TYPES } from "@mantine/dropzone"

import { DocumentData } from "@/types/document"

export type FormValues = {
  files: FileWithPath[]
  url: string
  eventId: string
  title: string
  emoji: string
}

export type FileType = typeof MIME_TYPES[keyof typeof MIME_TYPES] | ""

export type DocumentDetailResponse = DocumentData

export interface DocumentDetailCreateRequest {
  name: string
  user_id: string
  url?: string | null
  title: string
  emoji: string
  target_event: string
  file?: {
    data: string
    type: string
  } | null
}
export interface DocumentDetailUpdateRequest {
  name: string
  user_id: string
  url: string | null
  title: string
  emoji: string
  target_event: string
  file: {
    data: string
    type: string
  } | null
  id: string
}
