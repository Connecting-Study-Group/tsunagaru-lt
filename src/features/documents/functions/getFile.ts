import { Asset } from "contentful-management"

import { CONTENTFUL_BASE_INFO } from "@/constants"
import client from "@/lib/contentful"

export interface GetFileFromContentfulParams {
  id: string
}

/**
 * contentfulへファイルアップロード
 *
 * @param {GetFileFromContentfulParams} params
 * @returns {Promise<Asset>}
 */
export const getFileFromContentful = async (params: GetFileFromContentfulParams): Promise<Asset> => {
  // ファイルのアップロード
  const asset = await client
    .getSpace(CONTENTFUL_BASE_INFO.space)
    .then((space) => space.getEnvironment(CONTENTFUL_BASE_INFO.environment))
    .then((environment) => environment.getAsset(params.id))
    .then((asset) => {
      return asset
    })
  return asset
}
