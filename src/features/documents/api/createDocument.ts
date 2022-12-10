import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { axios } from "@/lib/axios"
import { DocumentDetailCreateRequest } from "../types"
import { BaseResponse } from "@/types"
import toast from "react-hot-toast"
import { AxiosResponse } from "axios"

export const createDocument = (req: DocumentDetailCreateRequest): Promise<AxiosResponse<BaseResponse, any>> => {
  const myPromise = axios.post<BaseResponse>(`/api/document-detail`, req)
  toast.promise(
    myPromise,
    {
      loading: "処理中...",
      success: "資料のアップロードに成功しました",
      error: "エラーが発生しました",
    },
    {
      position: "top-right",
    }
  )
  return myPromise
}

type UseCreateDocumentOptions = {
  config?: UseMutationOptions<AxiosResponse<BaseResponse, any>, unknown, DocumentDetailCreateRequest, unknown>
}

export const useCreateDocument = ({ config }: UseCreateDocumentOptions) => {
  return useMutation({
    ...config,
    mutationFn: createDocument,
  })
}
