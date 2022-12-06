import { useRouter } from "next/router";
import { useMemo } from "react";

export const useRouterQuery = (key: string) => {
    const router = useRouter();
    const queryData = useMemo(() => router.query[key] as string, [router]);
    return queryData
}
