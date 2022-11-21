import { useCallback, useMemo, useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export type UseAuth = () => {
  handleLogout: () => void;
  isLoading: boolean;
  user?: {
    name: string;
    image: string;
  };
  status: "authenticated" | "loading" | "unauthenticated";
};

export const useAuth = () => {
  const auth = getAuth(firebaseApp);
  const { data: session, status } = useSession();
  const { query } = useRouter();
  /**
   * @description ログイン処理
   */
  const handleLogin = useCallback(() => {
    const queryPrams = new URLSearchParams(window.location.search);
    const token = queryPrams.get("t");

    if (token) {
      window.history.replaceState(
        undefined,
        window.document.title,
        window.location.href.replace(window.location.search, "")
      );
      signInWithCustomToken(auth, token) // 認証に成功したら ID トークンを NextAuth に渡す
        .then((credential) => credential.user.getIdToken(true))
        .then((idToken) => {
          signIn("credentials", {
            idToken,
            callbackUrl: `${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/events`,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [auth]);
  /**
   * @description ログアウト処理
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e
   */
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    signOut({
      callbackUrl: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/login`,
    });
  };
  useEffect(() => {
    handleLogin();
  }, [handleLogin]);
  /**
   * @description ローディングフラグ
   */
  const isLoading = useMemo(
    () => status === "loading" || typeof query?.t === "string",
    [status, query]
  );
  /**
   * @description ユーザー情報
   */
  const user = useMemo(
    () =>
      session?.user as
        | {
            name: string;
            image: string;
          }
        | undefined,
    [session]
  );
  return {
    handleLogout,
    isLoading,
    user,
    status,
  };
};
