import React, { memo, useEffect, useState } from "react";
import { Text, Paper, Box, Button } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";
import { LogoSlack } from "react-ionicons";
import SystemHelper from "@/functions/system";

const BASE_URL = `https://slack.com/oauth/authorize?scope=team:read,users:read&client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}&state=`;

export const LoginPage = memo(() => {
  const { isLoading } = useAuth();
  const [slackAuthUrl, setSlackAuthUrl] = useState(BASE_URL);
  // slack認証用のURL
  useEffect(() => {
    if (SystemHelper.isBrowser)
      setSlackAuthUrl(`${BASE_URL}${window.location.href}`);
  }, []);
  return (
    <>
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
    </>
  );
});
