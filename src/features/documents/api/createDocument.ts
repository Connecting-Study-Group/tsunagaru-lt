import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { DocumentDetailCreateRequest } from "../types";
import { BaseResponse } from "@/types";
import { showNotification } from '@mantine/notifications';

export const createDocument = (req: DocumentDetailCreateRequest): Promise<BaseResponse> => {
  return axios.post(`/api/document-detail`, req);
};

type UseCreateDocumentOptions = {
  config?: UseMutationOptions<BaseResponse, unknown, DocumentDetailCreateRequest, unknown>;
};

export const useCreateDocument = ({ config }: UseCreateDocumentOptions) => {
  return useMutation({
    onSuccess: () => {
      showNotification({
        title: '成功',
        message: '資料をアップロードしました',
      })
    },
    ...config,
    mutationFn: createDocument,
  });
};


