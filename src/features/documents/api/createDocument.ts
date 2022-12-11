import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import toast from "react-hot-toast"

import { axios } from "@/lib/axios"
import { BaseResponse } from "@/types"

import { DocumentDetailCreateRequest } from "../types"

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
