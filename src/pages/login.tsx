import { Layout } from "@/components/system/Layout";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Text, Paper, Box, Button } from "@mantine/core";
import Head from "next/head";
import { useAuth } from "@/hooks/useAuth";
import { LogoSlack } from "react-ionicons";

const BASE_URL = `https://slack.com/oauth/authorize?scope=team:read,users:read&client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}&state=`;

const Login: NextPage = () => {
  const { isLoading } = useAuth();
  const [slackAuthUrl, setSlackAuthUrl] = useState(BASE_URL);
  // slack認証用のURL
  useEffect(() => {
    if (typeof window !== "undefined")
      setSlackAuthUrl(`${BASE_URL}${window.location.href}`);
  }, []);
  return (
    <Layout>
      <Head>
        <title>ログイン | つながるLT</title>
      </Head>
      <main>
        <Text component="h1">ログイン</Text>
        <Text>
          slackのコミュニティに所属しているメンバーであればログイン可能です
        </Text>
        <Button
          component="a"
          href={slackAuthUrl}
          variant="outline"
          leftIcon={<LogoSlack />}
          loading={isLoading}
          sx={{ backgroundColor: "white", border: "solid 1px black" }}
          size="md"
          color="dark"
        >
          Slackでログイン
        </Button>
      </main>
    </Layout>
  );
};

export default Login;
