import { CONTENTFUL_BASE_INFO } from "@/constants";
import client from "@/lib/contentful";
import { MIME_TYPES } from "@mantine/dropzone";
import { Asset } from "contentful-management";
import fs from "fs";
import path from "path";

const TMP_FILE_NAME = "tmp";

export interface UploadFileToContentfulParams {
  data: string;
  extension: keyof typeof MIME_TYPES;
  title: string;
}

/**
 * contentfulへファイルアップロード
 *
 * @param {UploadFileToContentfulParams} params
 * @returns {Promise<Asset>}
 */
export const uploadFileToContentful = async (
  params: UploadFileToContentfulParams
): Promise<Asset> => {
  const { data, extension, title } = params;
  const mimeType = MIME_TYPES[params.extension];
  // 一時ファイルの作成
  fs.writeFileSync(`./public/${TMP_FILE_NAME}.${extension}`, data, {
    encoding: "base64",
  });
  // 一時ファイルの読み込み
  const filePath = path.resolve("./public", `${TMP_FILE_NAME}.${extension}`);
  const tmpFile = fs.readFileSync(filePath);
  // ファイルのアップロード
  const upload = await client
    .getSpace(CONTENTFUL_BASE_INFO.space)
    .then((space) => space.getEnvironment(CONTENTFUL_BASE_INFO.environment))
    .then((environment) =>
      environment.createUpload({
        file: tmpFile,
      })
    )
    .then((upload) => {
      return upload;
    });
  // アセットの作成と公開
  const asset = await client
    .getSpace(CONTENTFUL_BASE_INFO.space)
    .then((space) => space.getEnvironment(CONTENTFUL_BASE_INFO.environment))
    .then((environment) => {
      return environment
        .createAsset({
          fields: {
            title: {
              "en-US": title,
            },
            file: {
              "en-US": {
                contentType: mimeType,
                fileName: `${title}.${extension}`,
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: upload.sys.id,
                  },
                },
              },
            },
          },
        })
        .then((asset) => {
          return asset.processForAllLocales({ processingCheckWait: 2000 });
        })
        .then((asset) => {
          return asset.publish();
        })
        .then((asset) => {
          return asset;
        });
    });
  // 一時ファイルの削除
  fs.unlink(`./public/${TMP_FILE_NAME}.${extension}`, (err) => {
    if (err) throw err;
  });
  return asset;
};
