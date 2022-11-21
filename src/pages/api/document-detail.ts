// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { EventCollectionResponse } from "@/repository/eventRepository";

type EventGetRequest = NextApiRequest & {
  query: {
    eventId: string | undefined;
    documentId: string | undefined;
  };
};

export default async function handler(
  req: EventGetRequest,
  res: NextApiResponse<EventCollectionResponse>
) {
  if (!req.query.eventId || !req.query.documentId) {
    res.status(400);
    return;
  }
  let data: any = {};
  const docSnap = await getDoc(
    doc(
      db,
      "study-group-list",
      req.query.eventId as string,
      "documents",
      req.query.documentId as string
    )
  );
  if (docSnap.exists()) {
    console.log(docSnap.data());
    data = docSnap.data();
  }
  res.status(200).json({ data });
}
