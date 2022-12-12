import React, { ReactElement } from "react"

import { LoginPage } from "@/features/misc/pages/Login"
import { DefaultLayout } from "@/layouts/Default"

const Login = (): JSX.Element => {
  return <LoginPage />
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="ログイン">{page}</DefaultLayout>
}

export default Login
