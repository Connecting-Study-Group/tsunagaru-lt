import { Layout } from "@/components/template/Layout";
import React, { ReactElement } from "react";
import { LoginPage } from "@/components/pages/LoginPage";

const Login = (): JSX.Element => {
  return <LoginPage />;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="ログイン">{page}</Layout>;
};

export default Login;
