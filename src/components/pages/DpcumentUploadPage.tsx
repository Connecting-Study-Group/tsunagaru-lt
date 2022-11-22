import { FileData } from "@/types/document";
import React, { memo, useState, useEffect } from "react";
import {
  TextInput,
  Input,
  Button,
  Group,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PageTitle } from "../atoms/PageTitle";
import data from "@emoji-mart/data";
import EmojiPicker from "@/components/atoms/EmojiPicker";

interface Props {
  eventId: string;
}

export const DocumentUploadPage: React.FC<Props> = memo(({ eventId }) => {
  const [documentType, setDocumentType] = useState("file");
  const [focused, setFocused] = useState(false);
  const [emojiFocused, setEmojiFocused] = useState(false);

  useEffect(() => {
    if (focused) {
      setTimeout(() => setEmojiFocused(true), 10);
    }
  }, [focused]);

  const form = useForm({
    initialValues: {
      email: "",
      file: "",
      url: "",
      eventId,
      name: "test",
      emoji: "",
      emojiPreview: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <PageTitle>資料の投稿</PageTitle>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          label="勉強会"
          description="LTをした勉強会を選択してください"
          placeholder=""
          required
          withAsterisk
          data={[
            { value: eventId, label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
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
          {documentType === "file" && (
            <TextInput withAsterisk {...form.getInputProps("file")} required />
          )}
          {documentType === "url" && (
            <TextInput withAsterisk {...form.getInputProps("url")} required />
          )}
        </Input.Wrapper>
        <TextInput
          label="名前"
          description="変更する必要がない場合はそのままで問題ありません"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="アイキャッチ絵文字の選択"
        >
          <TextInput
            id="input-demo"
            withAsterisk
            onClick={() => setFocused(true)}
            {...form.getInputProps("emojiPreview")}
            readOnly
          />
          {emojiFocused && (
            <EmojiPicker
              data={data}
              onEmojiSelect={(data: any) => {
                console.log(data);
                form.setFieldValue("emoji", data.id);
                form.setFieldValue("emojiPreview", data.native);
                setFocused(false);
                setEmojiFocused(false);
              }}
              onClickOutside={() => {
                console.log("close");
                setFocused(false);
                setEmojiFocused(false);
              }}
            />
          )}
        </Input.Wrapper>
        <Group position="right" mt="md">
          <Button type="submit">アップロード</Button>
        </Group>
      </form>
    </>
    // <Button onClick={handleOpenAddDocumentModal}>資料の追加</Button>
  );
});
