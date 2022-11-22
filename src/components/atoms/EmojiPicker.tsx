import React, { Suspense } from "react";
// @ts-ignore
const Picker = React.lazy(() => import("@emoji-mart/react"));
import type EmojiMart from "emoji-mart";

export default function EmojiPicker<
  T extends keyof typeof EmojiMart.Picker.Props
>(props: Record<T, typeof EmojiMart.Picker.Props[T]["value"]>) {
  return (
    <Suspense fallback={<></>}>
      <Picker {...props} />
    </Suspense>
  );
}
