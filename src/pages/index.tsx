import React from "react";
import { DefaultLayout } from "@/layouts/Default";
import { ReactElement } from "react";
import { IndexPage } from "@/features/misc/pages/Index";

const Index = (): JSX.Element => {
  return <IndexPage />
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Index;
