import React, { memo, useState, useEffect, useMemo } from "react";
import {
  TextInput,
  Input,
  Button,
  Group,
  Select,
  SegmentedControl,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PageTitle } from "../atoms/PageTitle";
import data from "@emoji-mart/data";
import EmojiPicker from "@/components/atoms/EmojiPicker";
import { EventCollection } from "@/repository/eventRepository";
import { useAuth } from "@/hooks/useAuth";
import {
  DocumentDetailRepository,
  DocumentDetailCreateRequest,
} from "@/repository/documentRepository";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import { BaseResponse } from "@/types";
import { useRouter } from "next/router";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";

interface Props {
  eventId: string;
  eventCollection: Record<string, EventCollection> | null;
}

type FormValues = {
  files: FileWithPath[];
  url: string;
  eventId: string;
  title: string;
  emoji: string;
  emojiPreview: string;
};

type FileType = typeof MIME_TYPES[keyof typeof MIME_TYPES] | "";

export const DocumentUploadPage: React.FC<Props> = memo(
  ({ eventId, eventCollection }) => {
    const [documentType, setDocumentType] = useState("file");
    const [focused, setFocused] = useState(false);
    const [emojiFocused, setEmojiFocused] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const [file, setFile] = useState("");
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [fileType, setFileType] = useState<FileType>("");
    const handleFile = (files: any) => {
      setFiles(files);
      const file = files[0];
      const extension =
        (Object.keys(MIME_TYPES).find(
          (key) => MIME_TYPES[key as keyof typeof MIME_TYPES] === file.type
        ) as FileType) || "";
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryData = ((reader.result || "") as any)
          .split(";base64,")
          .pop();
        setFile(binaryData);
        setFileType(extension);
      };
      reader.readAsDataURL(file);
    };
    const eventCollectionList = useMemo(() => {
      const list = [];
      if (eventCollection) {
        for (const event in eventCollection) {
          list.push({
            value: event,
            label: `${event}開催`,
          });
        }
      }
      return list;
    }, [eventCollection]);
    useEffect(() => {
      if (focused) {
        setTimeout(() => setEmojiFocused(true), 10);
      }
    }, [focused]);
    const form = useForm({
      initialValues: {
        files,
        url: "",
        eventId,
        title: "",
        emoji: "",
        emojiPreview: "",
      },

      validate: {
        files: (value) =>
          typeof value !== "object" && documentType === "file"
            ? "必須項目です"
            : null,
        url: (value) => {
          if (documentType === "url") {
            if (!value.length) {
              return "必須項目です";
            }
            let regexp =
              /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g;
            if (!regexp.test(value)) {
              return "URLの形式で入力してください";
            }
          }
          return null;
        },
        title: (value) => (!!value.trim().length ? null : "必須項目です"),
        emojiPreview: (value) =>
          !!value.trim().length ? null : "必須項目です",
      },
    });
    const mutation = useMutation(
      (req: DocumentDetailCreateRequest): AxiosPromise<BaseResponse> =>
        DocumentDetailRepository.create(req)
    );
    const handleSubmit = (values: FormValues) => {
      const req: DocumentDetailCreateRequest = {
        title: values.title,
        file:
          {
            data: file,
            type: fileType,
          } || null,
        url: values.url || null,
        name: user?.name || "sample",
        user_id: user?.id || "user-e",
        emoji: values.emoji,
        target_event: eventId,
      };
      mutation.mutate(req, {
        onSuccess: () => {
          // 成功時
          router.push(`/events/${router.query.eventId}`);
        },
        onError: (error) => {
          // 失敗時
          console.error(error);
        },
      });
    };

    if (!eventCollectionList.length) return <></>;
    return (
      <>
        <PageTitle>資料の投稿</PageTitle>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            label="勉強会"
            description="LTをした勉強会を選択してください"
            required
            withAsterisk
            defaultValue={eventId}
            data={eventCollectionList}
            {...form.getInputProps("eventId")}
          />
          <Input.Wrapper
            label="資料"
            description="ファイルか、URLで入力してください"
          >
            <SegmentedControl
              value={documentType}
              onChange={setDocumentType}
              data={[
                { label: "ファイル", value: "file" },
                { label: "URL", value: "url" },
              ]}
            />
            <Box
              style={{
                visibility: documentType === "file" ? "visible" : "hidden",
                height: documentType === "file" ? "auto" : 0,
              }}
            >
              <Dropzone
                onDrop={(files) => handleFile(files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                // accept={IMAGE_MIME_TYPE}
                {...form.getInputProps("files")}
              >
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: 220, pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    {/* <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          /> */}
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    {/* <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          /> */}
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    {/* <IconPhoto size={50} stroke={1.5} /> */}
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Box>
            <TextInput
              withAsterisk
              required
              {...form.getInputProps("url")}
              type={documentType === "url" ? "text" : "hidden"}
            />
          </Input.Wrapper>
          <TextInput
            label="表示タイトル"
            withAsterisk
            required
            {...form.getInputProps("title")}
          />

          <TextInput
            label="アイキャッチ絵文字"
            withAsterisk
            onClick={() => setFocused(true)}
            readOnly
            required
            {...form.getInputProps("emojiPreview")}
            inputContainer={(children) => (
              <>
                <>{children}</>
                {emojiFocused && (
                  <EmojiPicker
                    data={data}
                    onEmojiSelect={(data: any) => {
                      form.setFieldValue("emoji", data.id);
                      form.setFieldValue("emojiPreview", data.native);
                      setFocused(false);
                      setEmojiFocused(false);
                    }}
                    onClickOutside={() => {
                      setFocused(false);
                      setEmojiFocused(false);
                    }}
                  />
                )}
              </>
            )}
          />
          <Input type="hidden" {...form.getInputProps("emoji")} />
          <Group position="right" mt="md">
            <Button type="submit">アップロード</Button>
          </Group>
        </form>
      </>
    );
  }
);
