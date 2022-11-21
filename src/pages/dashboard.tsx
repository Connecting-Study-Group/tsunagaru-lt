import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import {
  EventCollectionRepository,
  EventCollectionResponse,
} from "@/repository/eventCollectionRepository";
import type { NextPage } from "next";
import React, { ReactElement } from "react";
import { DashboardPage } from "@/components/pages/DashboardPage";
import { Layout } from "@/components/template/Layout";

const Dashboard = (): JSX.Element => {
  const { isError, isLoading, data } = useQuery(
    ["event-collection"],
    (): AxiosPromise<EventCollectionResponse> =>
      EventCollectionRepository.findAll()
  );
  console.log(data);
  return <DashboardPage />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="ダッシュボード">{page}</Layout>;
};

export default Dashboard;
