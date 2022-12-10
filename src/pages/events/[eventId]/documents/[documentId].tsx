import React, { ReactElement } from "react"
import { DefaultLayout } from "@/layouts/Default"
import { DocumentDetailPage } from "@/features/misc/pages/DocumentDetail"

const DocumentDetail = (): JSX.Element => {
  return <DocumentDetailPage />
}

DocumentDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="LT資料">{page}</DefaultLayout>
}

export default DocumentDetail
