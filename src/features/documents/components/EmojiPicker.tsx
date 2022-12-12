import type EmojiMart from "emoji-mart"
import React, { Suspense } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Picker = React.lazy(() => import("@emoji-mart/react"))

export default function EmojiPicker<T extends keyof typeof EmojiMart.Picker.Props>(
  props: Record<T, typeof EmojiMart.Picker.Props[T]["value"]>
) {
  return (
    <Suspense fallback={<></>}>
      <Picker {...props} />
    </Suspense>
  )
}
