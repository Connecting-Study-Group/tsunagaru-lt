import { TextInput, Input, Button, Group, Select, SegmentedControl, Box } from "@mantine/core"
import { FileWithPath } from "@mantine/dropzone"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import React, { memo, useState, useMemo } from "react"

import { PageTitle } from "@/components/PageTitle"
import DocumentInput from "@/features/documents/components/DocumentInput"
import EmojiInput from "@/features/documents/components/EmojiInput"
import { useEventList } from "@/features/events/api/getEventList"
import { useAuth } from "@/hooks/useAuth"
import { useRouterQuery } from "@/hooks/useRouterQuery"

import { useCreateDocument } from "../api/createDocument"
import { DocumentDetailCreateRequest, FileType, FormValues } from "../types"

export const Form = memo(() => {
  const { data } = useEventList({})
  const router = useRouter()
  const eventId = useRouterQuery("eventId")
  const [documentType, setDocumentType] = useState("file")
  const { user } = useAuth()
  const [file, setFile] = useState("")
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [fileType, setFileType] = useState<FileType>("")
  const mutation = useCreateDocument({})
  const eventCollectionList = useMemo(() => {
    const list = []
    if (data) {
      for (const event in data) {
        list.push({
          value: event,
          label: `${event}開催`,
        })
      }
    }
    return list
  }, [data])
  const form = useForm({
    initialValues: {
      files,
      url: "",
      eventId,
      title: "",
      emoji: "",
    },
    validate: {
      files: (value) => (typeof value !== "object" && documentType === "file" ? "必須項目です" : null),
      url: (value) => {
        if (documentType === "url") {
          if (!value.length) {
            return "必須項目です"
          }
          let regexp = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g
          if (!regexp.test(value)) {
            return "URLの形式で入力してください"
          }
        }
        return null
      },
      title: (value) => (!!value.trim().length ? null : "必須項目です"),
      emoji: (value) => (!!value.trim().length ? null : "必須項目です"),
    },
  })
  const handleSubmit = (values: FormValues) => {
    const req: DocumentDetailCreateRequest = {
      title: values.title,
      file:
        {
          data: file,
          type: fileType,
        } || null,
      url: values.url || null,
      name: user?.name || "",
      user_id: user?.id || "",
      emoji: values.emoji,
      target_event: eventId,
    }
    mutation.mutate(req, {
      onSuccess: () => {
        // 成功時
        router.push(`/events/${eventId}`)
      },
      onError: (error) => {
        // 失敗時
        console.error(error)
      },
    })
  }
  // 勉強会のデータが0件の場合
  if (!eventCollectionList.length) return <PageTitle>資料の投稿</PageTitle>
  return (
    <>
      <PageTitle>資料の投稿</PageTitle>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* 勉強会 */}
        <Select
          label="勉強会"
          description="LTをした勉強会を選択してください"
          required
          withAsterisk
          defaultValue={eventId}
          data={eventCollectionList}
          {...form.getInputProps("eventId")}
        />
        {/* LT資料 */}
        <Input.Wrapper label="資料" description="ファイルか、URLで入力してください">
          <SegmentedControl
            value={documentType}
            onChange={setDocumentType}
            data={[
              { label: "ファイル", value: "file" },
              { label: "URL", value: "url" },
            ]}
          />
          {/* LT資料：ファイル */}
          <Box
            style={{
              visibility: documentType === "file" ? "visible" : "hidden",
              height: documentType === "file" ? "auto" : 0,
            }}
          >
            <DocumentInput
              form={form}
              files={files}
              setFile={setFile}
              setFiles={setFiles}
              setFileType={setFileType}
              isLoading={mutation.isLoading}
            />
          </Box>
          {/* LT資料：URL */}
          <TextInput
            withAsterisk
            required
            {...form.getInputProps("url")}
            type={documentType === "url" ? "text" : "hidden"}
          />
        </Input.Wrapper>
        {/* 表示タイトル */}
        <TextInput label="表示タイトル" withAsterisk required {...form.getInputProps("title")} />
        {/* アイキャッチ絵文字 */}
        <EmojiInput form={form} />
        <Group position="right" mt="md">
          <Button type="submit" disabled={mutation.isLoading}>
            アップロード
          </Button>
        </Group>
      </form>
    </>
  )
})
