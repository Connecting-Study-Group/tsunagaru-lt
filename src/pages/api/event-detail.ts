// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { EventCollectionResponse } from "@/repository/eventRepository";

type EventGetRequest = NextApiRequest & {
  query: {
    eventId: string | undefined;
  };
};

export default async function handler(
  req: EventGetRequest,
  res: NextApiResponse<EventCollectionResponse>
) {
  if (!req.query.eventId) {
    res.status(400);
    return;
  }
  const data: Record<string, any> = {};
  const querySnapshot = await getDocs(
    collection(db, "study-group-list", req.query.eventId as string, "documents")
  );
  await Promise.all(
    querySnapshot.docs.map((doc) => {
      data[doc.id] = doc.data();
    })
  );
  res.status(200).json({ data });
}
