import React, { memo } from "react";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { Group, Text } from "@mantine/core";
import { FormValues } from "../types";

interface Props {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  setFileType: React.Dispatch<React.SetStateAction<FileType>>;
}

type FileType = typeof MIME_TYPES[keyof typeof MIME_TYPES] | "";

const DocumentInput: React.FC<Props> = memo(
  ({ form, setFile, setFileType, setFiles }) => {
    /**
     * ファイル変更処理
     *
     * @param {*} files 入力されたファイルデータ
     */
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
    return (
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
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  }
);

export default DocumentInput;
