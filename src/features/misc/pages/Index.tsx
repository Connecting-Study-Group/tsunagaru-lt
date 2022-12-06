import React, { memo } from "react";
import Image from "next/image";
import { Text, Paper, Box, Button } from "@mantine/core";
import { Spacer } from "@/components/system/Spacer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const IndexPage = memo(() => {
  const { user } = useAuth();
  return (
    <>
      <Text component="h1" sx={{ visibility: "hidden" }}>
        つながるLT
      </Text>
      <Box sx={{ display: "flex" }}>
        <Spacer />
        <Paper shadow="md" p="md" radius={16} sx={{ display: "inline-flex" }}>
          <Image
            src="/images/logo.svg"
            width={120}
            height={120}
            alt="つながるLT"
          />
        </Paper>
        <Spacer />
      </Box>
      <Text sx={{ marginTop: 32 }}>
        「つながるLT」はつながる勉強会のコミュニティ内で使用できる資料共有サービスです。
      </Text>
      {/* 認証後ボタンを表示 */}
      {user ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Link href="/events" passHref>
            <Button
              component="a"
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
            >
              勉強会一覧を見る
            </Button>
          </Link>
        </Box>
      ) : (
        <Link href="/login" passHref>
          <Text>ログイン画面へ</Text>
        </Link>
      )}
    </>
  );
});
