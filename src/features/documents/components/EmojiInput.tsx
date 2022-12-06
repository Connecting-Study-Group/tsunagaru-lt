import React, { memo, useState, useEffect } from "react";
import { TextInput } from "@mantine/core";
import EmojiPicker from "@/features/documents/components/EmojiPicker";
import data from "@emoji-mart/data";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../types";

interface Props {
    form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
}

const EmojiInput: React.FC<Props> = memo(({ form }) => {
  const [focused, setFocused] = useState(false);
  const [emojiFocused, setEmojiFocused] = useState(false);
  // 一定時間経過後、表示用のフォーカスフラグを立てる
  useEffect(() => {
    if (focused) {
      setTimeout(() => setEmojiFocused(true), 10);
    }
  }, [focused]);
  return (
    <TextInput
      label="アイキャッチ絵文字"
      withAsterisk
      onClick={() => setFocused(true)}
      readOnly
      required
      {...form.getInputProps("emoji")}
      inputContainer={(children) => (
        <>
          <>{children}</>
          {emojiFocused && (
            <EmojiPicker
              data={data}
              onEmojiSelect={(data: any) => {
                form.setFieldValue("emoji", data.native);
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
  );
});

export default EmojiInput;
