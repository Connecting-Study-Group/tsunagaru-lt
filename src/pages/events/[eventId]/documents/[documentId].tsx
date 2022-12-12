import React, { ReactElement } from "react"

import { DocumentDetailPage } from "@/features/misc/pages/DocumentDetail"
import { DefaultLayout } from "@/layouts/Default"

const DocumentDetail = (): JSX.Element => {
  return <DocumentDetailPage />
}

DocumentDetail.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="LT資料">{page}</DefaultLayout>
}

export default DocumentDetail
