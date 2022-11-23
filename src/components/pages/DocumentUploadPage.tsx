import React, { memo, useState, useEffect, useMemo } from "react";
import {
  TextInput,
  Input,
  Button,
  Group,
  Select,
  SegmentedControl,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PageTitle } from "../atoms/PageTitle";
import data from "@emoji-mart/data";
import EmojiPicker from "@/components/atoms/EmojiPicker";
import { EventCollection } from "@/repository/eventRepository";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  eventId: string;
  eventCollection: Record<string, EventCollection> | null;
}

type FormValues = {
  file: string;
  url: string;
  eventId: string;
  name: string;
  emoji: string;
  emojiPreview: string;
};

export const DocumentUploadPage: React.FC<Props> = memo(
  ({ eventId, eventCollection }) => {
    const [documentType, setDocumentType] = useState("file");
    const [focused, setFocused] = useState(false);
    const [emojiFocused, setEmojiFocused] = useState(false);
    const { user } = useAuth();
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
        file: "",
        url: "",
        eventId,
        name: user?.name || "",
        emoji: "",
        emojiPreview: "",
      },

      validate: {
        file: (value) =>
          !value.trim().length && documentType === "file"
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
        name: (value) => (!!value.trim().length ? null : "必須項目です"),
        emojiPreview: (value) =>
          !!value.trim().length ? null : "必須項目です",
      },
    });
    const onSubmit = (values: FormValues) => console.log(values);

    if (!eventCollectionList.length) return <></>;
    return (
      <>
        <PageTitle>資料の投稿</PageTitle>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <FileInput
              placeholder="Pick file"
              label="Your resume"
              withAsterisk
              required
              {...form.getInputProps("file")}
              type={documentType === "file" ? "text" : "hidden"}
            />
            <TextInput
              withAsterisk
              required
              {...form.getInputProps("url")}
              type={documentType === "url" ? "text" : "hidden"}
            />
          </Input.Wrapper>
          <TextInput
            label="名前"
            description="変更する必要がない場合はそのままで問題ありません"
            withAsterisk
            required
            {...form.getInputProps("name")}
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
