import { useCallback, useMemo } from "react"

import { UserId } from "@/types"
import { DocumentData } from "@/types/document"

export const useEventDetailData = (data: Record<UserId, DocumentData> | undefined) => {
  /**
   * ユーザー情報一覧
   *
   * @type {string[]}
   */
  const userList = useMemo(() => {
    if (data) {
      return Object.keys(data)
    }
    return []
  }, [data])
  /**
   * 資料データの取得
   *
   * @param {string}  userId ユーザーID
   * @return {DocumentData | null} ドキュメント情報
   */
  const getDocument = useCallback(
    (userId: string) => {
      if (data) {
        const eventData = data[userId]
        return eventData || null
      }
      return null
    },
    [data]
  )
  return { userList, getDocument }
}
