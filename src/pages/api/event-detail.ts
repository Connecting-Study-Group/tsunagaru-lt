// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from "next"

import { db } from "@/lib/firebase"
import { UserId } from "@/types"
import { DocumentData } from "@/types/document"

type EventGetRequest = NextApiRequest & {
  query: {
    eventId: string | undefined
  }
}

export default async function handler(req: EventGetRequest, res: NextApiResponse<Record<UserId, DocumentData>>) {
  if (!req.query.eventId) {
    return res.status(400)
  }
  const data: Record<string, any> = {}
  const querySnapshot = await getDocs(collection(db, "study-group-list", req.query.eventId as string, "documents"))
  await Promise.all(
    querySnapshot.docs.map((doc) => {
      data[doc.id] = doc.data()
    })
  )
  res.status(200).json(data)
}
