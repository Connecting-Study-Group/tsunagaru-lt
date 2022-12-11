import { PageTitle } from "@/components/PageTitle"
import { DocumentId, EventId } from "@/types"
import React, { memo, useMemo } from "react"
import { useDocumentDetail } from "../api/getDocument"

interface Props {
  eventId: EventId
  documentId: DocumentId
}

export const DocumentDetail: React.FC<Props> = memo(({ eventId, documentId }) => {
  const { data, isLoading } = useDocumentDetail({ eventId, documentId })
  console.log(data)
  // 資料のURL
  const documentUrl = useMemo(() => {
    return data?.file ? `https:${(data as any).file.fields.file["en-US"].url}` : data?.url || ""
  }, [data])
  // 資料の名前
  const documentName = useMemo(() => {
    const extend = documentUrl.match(/[^.]+$/)
    return data?.file
      ? `${(data as any).file.fields.file["en-US"].fileName}`
      : `${data?.title || "no-title"}.${extend ? extend[0] : ""}`
  }, [data, documentUrl])
  // ローディング
  if (isLoading) return <p>Loading...</p>
  //   データがない場合
  if (!data) return <p>no data</p>
  return (
    <>
      <PageTitle>{data.title}</PageTitle>
      <div>
        <span>{data.emoji}</span>
        <span>{data.name}</span>
        {data.file && (
          <p>
            <a target="_blank" href={documentUrl} download={documentName} rel="noreferrer">
              ダウンロード
            </a>
          </p>
        )}
      </div>
    </>
  )
})
