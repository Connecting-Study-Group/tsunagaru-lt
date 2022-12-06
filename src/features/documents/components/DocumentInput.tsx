import React, { memo } from "react";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { Group, Text, createStyles, Box } from "@mantine/core";
import { FormValues } from "../types";
import { MdInsertDriveFile, MdCheck, MdOutlineError } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    cursor: "not-allowed",

    "& *": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
    },
  },
}));

interface Props {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  files: FileWithPath[];
  setFile: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  setFileType: React.Dispatch<React.SetStateAction<FileType>>;
  isLoading: boolean;
}

type FileType = typeof MIME_TYPES[keyof typeof MIME_TYPES] | "";

const DocumentInput: React.FC<Props> = memo(
  ({ files, form, setFile, setFileType, setFiles, isLoading }) => {
    const { classes } = useStyles();
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
      <>
        <Dropzone
          onDrop={(files) => handleFile(files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          disabled={isLoading}
          className={isLoading && classes.disabled}
          // accept={IMAGE_MIME_TYPE}
          {...form.getInputProps("files")}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 160, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <MdCheck size={32} color="blue" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <MdOutlineError size={32} color="red" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <MdInsertDriveFile size={32} color="gray" />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                ここに画像をドラッグするか、クリックしてファイルを選択します。
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                ファイルは5MBを超えないようにしてください。
              </Text>
            </div>
          </Group>
        </Dropzone>
        {!!files.length && (
          <Box mt="xs" mb="xl">
            <Text>アップロードしたファイル：{files[0].name}</Text>
          </Box>
        )}
      </>
    );
  }
);

export default DocumentInput;
