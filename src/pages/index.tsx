import { Layout } from "@/components/template/Layout";
import { ReactElement } from "react";
import { IndexPage } from "@/components/pages/IndexPage";

const Index = (): JSX.Element => {
  return <IndexPage />;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
