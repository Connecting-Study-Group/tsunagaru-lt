import React, { ReactElement } from "react"

import { IndexPage } from "@/features/misc/pages/Index"
import { DefaultLayout } from "@/layouts/Default"

const Index = (): JSX.Element => {
  return <IndexPage />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Index
